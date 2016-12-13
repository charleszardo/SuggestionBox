class SessionsController < ApplicationController
  before_action :require_current_user_is_owner, only: [:destroy]

  def create
    user = User.find_by_credentials(user_params)

    if user
      login_user!(user)
      render json: user
    else
      render json: user.errors.full_messages
    end
  end

  def new
    @signin_page = true
    @session = Session.new
    render :new
  end

  def destroy
    if current_user
      destroy_session = Session.find(params[:id])
      if destroy_session.session_token == session[:session_token]
        session[:session_token] = nil
      end
      destroy_session.destroy

      redirect_to root_url
    end
  end

  private
  def current_user_is_owner?
    current_user && current_user.is_owner?(:session, Session.find(params[:id]))
  end
end
