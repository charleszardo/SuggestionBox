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
    @user = User.includes(:suggestions).find(params[:id])
    @suggestions = @user.suggestions

    render :show
  end

  def edit
    @user = User.find(params[:id])

    render :edit
  end

  def update
    @user = User.find(params[:id])
    current_password = user_params["current_password"]
    @new_password = user_params["password"]

    if !@user.is_password?(current_password)
      handle_incorrect_password
    else
      edit_user
      attempt_save_after_edit
    end
  end

  private
  def require_is_current_user
    current_user == User.find(params[:id])
  end

  def handle_incorrect_password
    add_flash_error("Current Password is Incorrect")
    redirect_to edit_user_url(@user)
  end

  def edit_user
    changes = { username: user_params["username"] }
    changes[:password] = @new_password unless @new_password.empty?
    @user.assign_attributes(changes)
  end

  def attempt_save_after_edit
    if @user.save
      redirect_to user_url(@user)
    else
      add_flash_error(@user.errors.full_messages)
      redirect_to edit_user_url(@user)
    end
  end
end
