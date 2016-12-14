class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :current_session
  helper_method :logged_in?
  helper_method :current_user_is_owner?

  private
  def current_user
    @current_user ||= current_session.user if current_session
  end

  def current_session
    @current_session ||= Session.includes(:user).find_by(session_token: session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def login_user!(user)
    token = Session.generate_session_token
    curr_session = Session.new(user: user, session_token: token)

    session[:session_token] = token if curr_session.save
  end

  def user_params
    params.require(:user).permit(:username, :password, :current_password)
  end

  def require_login
    unless logged_in?
      add_flash_error("You must be logged in to access this section")

      redirect_to root_url
    end
  end

  def require_no_login
    unless !logged_in?
      add_flash_error("Please sign out to access this section")

      redirect_to root_url
    end
  end

  def require_current_user_is_owner
    require_login

    unless current_user_is_owner?
      add_flash_error("Access Denied!")

      redirect_to root_url
    end
  end

  def current_user_is_owner?

  end

  def add_flash_error(msg)
    flash[:errors] ||= []
    if msg.is_a?(Array)
      msg.each { |error| flash[:errors] << error }
    else
      flash[:errors] << msg
    end
  end
end
