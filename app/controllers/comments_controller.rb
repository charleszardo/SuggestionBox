class CommentsController < ApplicationController
  before_action :require_login!

  def create
    suggestion = Suggestion.find(params[:suggestion_id])
    comment = suggestion.comments.new(comment_params)
    comment.author = User.all.first
    comment.save

    respond_with(comment)
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :suggestion_id)
  end
end
