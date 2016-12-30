class VotesController < ApplicationController
  # before_action :require_login

  def create
    klass = params[:suggestion_id] ? Suggestion : Comment

    vote = Vote.new(vote_params)
    vote.voteable_type = klass.to_s
    vote.voteable_id = params[:suggestion_id] || params[:comment_id]
    vote.user_id = vote.user_id || 1

    vote.save

    obj = klass.find(vote.voteable_id)
    respond_with(obj, { vote_count: obj.vote_count })
    # curr_vote_obj = Vote.find_by(user: current_user,
    #                          suggestion_id: params[:suggestion_id])
    #
    # new_vote_bool = vote_params[:upvote] == "true" ? true : false
    # if curr_vote_obj
    #   curr_vote_obj.destroy! if vote_negated?(curr_vote_obj.upvote, new_vote_bool)
    #
    #   redirect_to suggestion_url(curr_vote_obj.suggestion)
    # else
    #   curr_vote_obj = Vote.new(user: current_user,
    #                            upvote: new_vote_bool,
    #                            suggestion_id: params[:suggestion_id])
    #   curr_vote_obj.save
    #
    #   redirect_to suggestion_url(curr_vote_obj.suggestion)
    # end
  end

  private
  def vote_negated?(curr_vote, new_vote)
    (curr_vote && !new_vote) || (!curr_vote && new_vote)
  end

  def vote_params
    params.require(:vote).permit(:upvote)
  end
end
