class SummernoteInput < Formtastic::Inputs::TextInput
  def input_html_options
    super.merge(class: "summernote")
  end
end
