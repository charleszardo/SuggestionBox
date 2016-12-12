class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :current_session
  helper_method :logged_in?

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
    session_token = Session.generate_session_token
    session = Session.new(user: user, session_token: session_token)

    if session.save
      session[:session_token] = session_token
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
