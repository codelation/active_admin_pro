class AutocompleteInput < Formtastic::Inputs::StringInput
  def input_html_options
    super.merge(class: "autocomplete")
  end
end
