class DatepickerInput < ActiveAdmin::Inputs::DatepickerInput
  # Override the HTML options to better work with the date picker and nil values.
  def input_html_options
    super.merge(value: (object.send(method) || Time.zone.now).strftime("%B %e, %Y").gsub(/\s\s/, " "))
  end

private

  # Override the datepicker options to set the date format.
  def datepicker_options
    datepicker_options = super
    datepicker_options[:datepicker_options] ||= {}
    datepicker_options[:datepicker_options][:dateFormat] = "MM d, yy"
    datepicker_options
  end
end
