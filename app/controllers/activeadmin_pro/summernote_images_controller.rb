module ActiveadminPro
  # The controller used to handle images uploaded with the Summernote editor.
  class SummernoteImagesController < ActionController::Base
    protect_from_forgery with: :exception

    def create
      @file = params[:file]
      s3_object.put(
        acl:  "public-read",
        body: @file.tempfile
      )
      render text: s3_object.public_url
    end

  private

    # The S3 bucket used for saving the uploaded images.
    # @return [Aws::S3::Bucket]
    def s3_bucket
      @s3_bucket ||= s3_resource.bucket(ENV.fetch("AWS_BUCKET"))
    end

    # The S3 object used to save the uploaded file.
    # @return [Aws::S3::Object]
    def s3_object
      @s3_object ||= s3_bucket.object(s3_object_key)
    end

    # The S3 object key used for storing the image uploaded from the Summernote editor.
    # @return [String]
    def s3_object_key
      file_ext = File.extname(@file.original_filename)
      file_base = File.basename(@file.original_filename, file_ext)
      time = Time.now.to_i
      "aap/si/#{file_base}_#{time}#{file_ext}"
    end

    # Authorized S3 resource for accessing buckets
    # @return [Aws::S3::Resource]
    def s3_resource
      @s3_resource ||= Aws::S3::Resource.new
    end
  end
end
