class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      render json: @user
    else
      render json: @user.errors.full_messages
    end
  end

  def new
    @signin_page = true
    @user = User.new
  end

  def index
    @users = User.all
    render :index
  end
end
