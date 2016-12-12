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

  def show
    @user = User.find(params[:id])

    render :show
  end

  def edit
    @user = User.find(params[:id])

    render :edit
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes(user_params)
      redirect_to user_url(@user)
    else
      render json: @user.errors.full_messages
    end
  end
end
