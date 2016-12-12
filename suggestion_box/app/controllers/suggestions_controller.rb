class SuggestionsController < ApplicationController
  def index
    @suggestions = Suggestion.all

    render :index
  end

  def create
    @suggestion = Suggestion.new(suggestion_params)
    @suggestion.author = current_user

    if @suggestion.save
      redirect_to suggestion_url(@suggestion)
    else
      render json: @suggestion.errors.full_messages
    end
  end

  def new
    @suggestion = Suggestion.new

    render :new
  end

  def edit
    @suggestion = Suggestion.find_by(params[:id])

    if @suggestion.save
      redirect_to suggestion_url(@suggestion)
    else
      render json: @suggestion.errors.full_messages
    end
  end

  private
  def suggestion_params
    params.require(:suggestion).permit(:title, :body)
  end
end
