class AccessDeniedError < StandardError
end
class NotAuthenticatedError < StandardError
end
class AuthenticationTimeoutError < StandardError
end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  attr_reader :current_user

  rescue_from AuthenticationTimeoutError, with: :authentication_timeout
  rescue_from NotAuthenticatedError, with: :user_not_authenticated

  respond_to :json

  helper_method :current_user
  helper_method :current_session
  helper_method :logged_in?
  helper_method :current_user_is_owner?

  def angular
    render 'layouts/application'
  end

  protected
  def authenticate_request!
    fail NotAuthenticatedError unless user_id_included_in_auth_token?
    @current_user = User.find(decoded_auth_token[:user_id])
  rescue JWT::ExpiredSignature
    raise AuthenticationTimeoutError
  rescue JWT::VerificationError, JWT::DecodeError
    raise NotAuthenticatedError
  end

  private
  def user_id_included_in_auth_token?
    http_auth_token && decoded_auth_token && decoded_auth_token[:user_id]
  end

  def decoded_auth_token
    @decoded_auth_token ||= AuthToken.decode(http_auth_token)
  end

  def http_auth_token
  @http_auth_token ||= if request.headers['Authorization'].present?
                         request.headers['Authorization'].split(' ').last
                       end
  end

  def authentication_timeout
    render json: { errors: ['Authentication Timeout'] }, status: 419
  end

  def forbidden_resource
    render json: { errors: ['Not Authorized To Access Resource'] }, status: :forbidden
  end

  def user_not_authenticated
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end
  # def current_user
  #   @current_user ||= current_session.user if current_session
  # end

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
