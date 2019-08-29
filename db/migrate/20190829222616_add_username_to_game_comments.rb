class AddUsernameToGameComments < ActiveRecord::Migration[5.2]
  def change
    add_column :game_comments, :username, :string
  end
end
