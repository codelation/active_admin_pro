class TimeZoneInput < Formtastic::Inputs::SelectInput
  TIME_ZONES = [
    ["(GMT -12:00) Marshall Is.", "Marshall Is.", { class: "time-zone--12" }],
    ["(GMT -11:00) Midway Island", "Midway Island", { class: "time-zone-11" }],
    ["(GMT -10:00) Hawaii", "Hawaii", { class: "time-zone-10" }],
    ["(GMT -9:00) Alaska", "Alaska", { class: "time-zone-9" }],
    ["(GMT -8:00) Pacific Time (US & Canada)", "Pacific Time (US & Canada)", { class: "time-zone-8" }],
    ["(GMT -7:00) Mountain Time (US & Canada)", "Mountain Time (US & Canada)", { class: "time-zone-7" }],
    ["(GMT -6:00) Central Time (US & Canada)", "Central Time (US & Canada)", { class: "time-zone-6" }],
    ["(GMT -5:00) Eastern Time (US & Canada)", "Eastern Time (US & Canada)", { class: "time-zone-5" }],
    ["(GMT -4:00) Atlantic Time (Canada)", "Atlantic Time (Canada)", { class: "time-zone-4" }],
    ["(GMT -3:30) Newfoundland", "Newfoundland", { class: "time-zone-3.5" }],
    ["(GMT -3:00) Buenos Aires", "Buenos Aires", { class: "time-zone-3" }],
    ["(GMT -2:00) Mid-Atlantic", "Mid-Atlantic", { class: "time-zone-2" }],
    ["(GMT -9:00) Azores", "Azores", { class: "time-zone-1" }],
    ["(GMT) London", "London", { class: "time-zone0" }],
    ["(GMT +1:00) Brussels", "Brussels", { class: "time-zone1" }],
    ["(GMT +2:00) South Africa", "South Africa", { class: "time-zone2" }],
    ["(GMT +3:00) Baghdad", "Baghdad", { class: "time-zone3" }],
    ["(GMT +3:30) Tehran", "Tehran", { class: "time-zone3.5" }],
    ["(GMT +4:00) Abu Dhabi", "Abu Dhabi", { class: "time-zone4" }],
    ["(GMT +4:30) Kabul", "Kabul", { class: "time-zone4.5" }],
    ["(GMT +5:00) Ekaterinburg", "Ekaterinburg", { class: "time-zone5" }],
    ["(GMT +5:30) New Delhi", "New Delhi", { class: "time-zone5.5" }],
    ["(GMT +5:45) Kathmandu", "Kathmandu", { class: "time-zone5.75" }],
    ["(GMT +6:00) Almaty", "Almaty", { class: "time-zone6" }],
    ["(GMT +7:00) Bangkok", "Bangkok", { class: "time-zone7" }],
    ["(GMT +8:00) Beijing", "Beijing", { class: "time-zone8" }],
    ["(GMT +9:00) Tokyo", "Tokyo", { class: "time-zone9" }],
    ["(GMT +9:30) Adelaide", "Adelaide", { class: "time-zone9.5" }],
    ["(GMT +10:00) Guam", "Guam", { class: "time-zone10" }],
    ["(GMT +11:00) Magadan", "Magadan", { class: "time-zone11" }],
    ["(GMT +12:00) Auckland", "Auckland", { class: "time-zone12" }]
  ]

  def collection
    TIME_ZONES
  end

  def wrapper_html_options
    super.merge(class: "select input time_zone")
  end
end
