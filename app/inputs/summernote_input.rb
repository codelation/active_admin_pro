class SummernoteInput < Formtastic::Inputs::TextInput
  def input_html_options
    summernote_options = options[:summernote] || {}
    super.merge(class: "summernote", data: { summernote_options: summernote_options })
  end
end
