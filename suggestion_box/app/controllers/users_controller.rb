class UsersController < ApplicationController
  before_action :require_no_login, only: [:create, :new]
  before_action :require_is_current_user, only: [:edit, :update]

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to user_url(@user)
    else
      add_flash_error(@user.errors.full_messages)
      redirect_to root_url
    end
  end

  def new
    @signin_page = true
    @user = User.new

    render :new
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
    old_password = user_params["old_password"]

    if !@user.is_password?(old_password)
      add_flash_error("Current Password is Incorrect")

      redirect_to user_url(@user)
    else
      @user.assign_attributes(username: user_params["username"], password: user_params["password"])
      if @user.save
        redirect_to user_url(@user)
      else
        add_flash_error(@user.errors.full_messages)

        redirect_to user_url(@user)
      end
    end
  end

  private
  def require_is_current_user
    current_user == User.find(params[:id])
  end
end
