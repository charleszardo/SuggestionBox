class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.author = current_user
    
    if @comment.save
      redirect_to suggestion_url(@comment.suggestion)
    else
      render json: @comment.errors.full_messages
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :suggestion_id)
  end
end
