ActiveAdmin.register ActiveAdminPro::SummernoteImage do
  actions :create
  menu false

  controller do
    def create
      @file = params[:file]
      if ENV["AWS_BUCKET"]
        @bucket = s3_bucket
      elsif ENV["GOOGLE_STORAGE_BUCKET"]
        @bucket = google_storage_bucket
      end
      if @bucket
        render text: upload_file
      else
        render json: { error: "No AWS or Google cloud storage bucket setup.  Please set the AWS_BUCKET or GOOGLE_STORAGE_BUCKET." }, status: :unprocessable_entity
      end
    end

  private

    # The storage object key used for saving the image uploaded from the Summernote editor.
    # @return [String]
    def storage_object_key
      file_ext = File.extname(@file.original_filename)
      file_base = File.basename(@file.original_filename, file_ext)
      time = Time.now.to_i
      "aap/si/#{file_base.parameterize}-#{time}#{file_ext}"
    end

    def google_storage_bucket
      connection = Fog::Storage.new(
        provider:                         "Google",
        google_storage_access_key_id:     ENV.fetch("GOOGLE_STORAGE_ACCESS_KEY_ID"),
        google_storage_secret_access_key: ENV.fetch("GOOGLE_STORAGE_SECRET_ACCESS_KEY")
      )
      connection.directories.get(ENV.fetch("GOOGLE_STORAGE_BUCKET"))
    end

    def s3_bucket
      connection = Fog::Storage.new(
        provider:              "AWS",
        aws_access_key_id:     ENV.fetch("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key: ENV.fetch("AWS_SECRET_ACCESS_KEY")
      )
      connection.directories.get(ENV.fetch("AWS_BUCKET"))
    end

    # Upload the image to the Amazon S3 bucket or Google Storage bucket.
    # @return [String] The public URL of the image
    def upload_file
      file = @bucket.files.create(
        key:    storage_object_key,
        body:   @file.tempfile,
        public: true
      )
      file.save
      file.public_url
    end
  end
end
