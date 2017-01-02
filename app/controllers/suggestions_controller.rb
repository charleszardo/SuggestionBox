class SuggestionsController < ApplicationController
  # before_action :require_login, only: [:create, :new]
  # before_action :require_current_user_is_owner, only: [:update, :edit, :destroy]

  def index
    @suggestions = Suggestion.includes(:author, :votes, :comments).all

    respond_with :index
  end

  def show
    @suggestion = Suggestion.includes(:author, :votes, :comments => [:author]).find(params[:id])

    respond_with :show
  end

  def create
    suggestion = Suggestion.new(suggestion_params)

    # CHANGE BELOW AFTER IMPLEMENTING USERS
    suggestion.user_id = 1
    suggestion.save

    respond_with suggestion
  end

  def edit
    respond_with Suggestion.find(params[:id])
  end

  def update
    suggestion = Suggestion.find(params[:id])
    suggestion.update_attributes(suggestion_params)

    respond_with suggestion
  end

  def destroy
    suggestion = Suggestion.find(params[:id])
    suggestion.destroy

    respond_with suggestion
  end

  private
  def suggestion_params
    params.require(:suggestion).permit(:title, :body)
  end

  def current_user_is_owner?
    current_user.is_owner?(:suggestion, Suggestion.find(params[:id]))
  end
end
