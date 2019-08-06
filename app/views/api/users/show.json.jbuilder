json.partial! 'api/users/user', user: @user
# @user.games.each do |game|
#   json.set! game.id do
#     json.partial! 'api/games/game', game: @game
#   end
# end