class CommentsController < ApplicationController
  before_action :require_login

  def create
    suggestion = Suggestion.find(params[:suggestion_id])
    comment = suggestion.comments.new(comment_params)
    comment.author = User.all.first
    comment.save

    p suggestion
    p comment
    respond_to suggestion, comment

    # if @comment.save
    #   redirect_to suggestion_url(@comment.suggestion)
    # else
    #   add_flash_error(@comment.errors.full_messages)
    #   redirect_to suggestion_url(@comment.suggestion)
    # end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :suggestion_id)
  end
end
