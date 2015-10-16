puts "HOW MANY TIMES DOES THIS LOAD?? CodemirrorInput"
class CodemirrorInput < Formtastic::Inputs::TextInput
  def input_html_options
    ap options[:mode]
    super.merge(class: "codemirror")
  end
end
