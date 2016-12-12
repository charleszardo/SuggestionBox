class SessionsController < ApplicationController
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
end
