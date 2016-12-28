class CommentsController < ApplicationController
  before_action :require_login

  def create
    @comment = Comment.new(comment_params)
    @comment.author = current_user

    if @comment.save
      redirect_to suggestion_url(@comment.suggestion)
    else
      add_flash_error(@comment.errors.full_messages)
      redirect_to suggestion_url(@comment.suggestion)
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :suggestion_id)
  end
end
