json.array! @suggestions do |suggestion|
  json.id suggestion.id
  json.title suggestion.title
  json.body suggestion.body
  json.created_at suggestion.created_at
  json.updated_at suggestion.updated_at
  json.user_id suggestion.user_id
  json.author suggestion.author_username
  json.vote_count suggestion.vote_count
  json.comments suggestion.comments
end
