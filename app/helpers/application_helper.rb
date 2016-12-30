module ApplicationHelper
  def auth_token
    str = "<input type='hidden'" +
            "name='authenticity_token'" +
            "value='#{form_authenticity_token}'>"
    str.html_safe
  end
end
