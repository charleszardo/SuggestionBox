class VotesController < ApplicationController
  before_action :require_login!

  def create
    klass = params[:suggestion_id] ? Suggestion : Comment
    voteable_id = params[:suggestion_id] || params[:comment_id]
    voteable_type = klass.to_s

    vote = Vote.find_or_create_by({
      user: current_user,
      voteable_id: voteable_id,
      voteable_type: voteable_type
      })

    if vote.upvote.nil?
      vote.upvote = vote_params[:upvote]
      vote.save
    elsif vote_negated?(vote.upvote, vote_params[:upvote])
      vote.destroy!
    else
      fail AccessDeniedError
    end

    obj = klass.find(vote.voteable_id)
    respond_with(obj, { vote_count: obj.vote_count })
  end

  private
  def vote_params
    params.require(:vote).permit(:upvote)
  end

  def vote_negated?(curr_vote, new_vote)
    (curr_vote && !new_vote) || (!curr_vote && new_vote)
  end
end
