class CodemirrorInput < Formtastic::Inputs::TextInput
  def input_html_options
    codemirror_options = options[:codemirror] || {}

    # Convert any underscored option keys to camel case
    codemirror_options.keys.each do |key|
      codemirror_options[key.to_s.camelize(:lower).to_sym] = codemirror_options.delete(key)
    end

    # Set any default options for addons if they aren't already set
    codemirror_options[:autoCloseBrackets] = true unless codemirror_options[:autoCloseBrackets] == false
    codemirror_options[:lineNumbers] = true       unless codemirror_options[:lineNumbers] == false
    codemirror_options[:matchBrackets] = true     unless codemirror_options[:matchBrackets] == false
    codemirror_options[:matchTags] = true         unless codemirror_options[:matchTags] == false

    # Additional default options that don't need to check for a false value
    codemirror_options[:extraKeys] ||= {}
    codemirror_options[:extraKeys][:Enter] ||= "newlineAndIndentContinueMarkdownList"
    codemirror_options[:tabSize] ||= 2

    # Set the default theme to the matching Active Admin Pro theme
    codemirror_options[:theme] ||= "active_admin_pro"

    # Pass the CodeMirror options as a data attribute to the input element
    super.merge(class: "codemirror", data: { codemirror: codemirror_options })
  end
end
