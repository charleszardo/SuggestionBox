class CommentsController < ApplicationController
  def create
    fail
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
