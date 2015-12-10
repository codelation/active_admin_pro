class PhoneInput < Formtastic::Inputs::StringInput
  def input_html_options
    super.merge(class: "phone")
  end
end
