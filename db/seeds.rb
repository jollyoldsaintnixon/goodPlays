# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require 'mechanize'
# require 'open-uri'


# ApplicationRecord.connection.reset_pk_sequence('games')

Game.destroy_all

# table = CSV.read("#{Rails.root}/lib/assets/games-features.csv", headers: true)

# array_of_hashes = []
# table.each do |row|
#   temp_hash = {}
#   array_of_genres = []
#   array_of_categories = []
#   temp_hash[:title] = row[3]
#   temp_hash[:description] = row[64]
#   temp_hash[:release_date] = row[4]
#   temp_hash[:price] = row[58]
#   temp_hash[:image_url] = row[67]
#     if row[44] == "True"
#       array_of_genres << 'indie'
#     end
#     if row[45] == "True"
#       array_of_genres << 'action'
#     end
#     if row[46] == "True"
#       array_of_genres << 'adventure'
#     end
#     if row[47] == "True"
#       array_of_genres << 'casual'
#     end
#     if row[49] == "True"
#       array_of_genres << 'rpg'
#     end
#     if row[50] == "True"
#       array_of_genres << 'simulation'
#     end
#     if row[53] == "True"
#       array_of_genres << 'sports'
#     end
#     if row[54] == "True"
#       array_of_genres << 'racing'
#     end
#     if row[55] == "True"
#       array_of_genres << 'mmo'
#     end
#     if row[35] == "True"
#       array_of_categories << 'single-player'
#     end
#     if row[36] == "True"
#       array_of_categories << 'multi-player'
#     end
#     if row[37] == "True"
#       array_of_categories << 'co-op'
#     end
#   temp_hash[:genres] = array_of_genres
#   temp_hash[:categories] = array_of_categories
#   array_of_hashes << temp_hash
# end

# array_of_hashes = []
# table.each do |row|
#   temp_hash = {}
#   temp_hash[:title] = row[3]
#   temp_hash[:description] = row[64]
#   temp_hash[:release_date] = row[4]
#   temp_hash[:price] = row[58]
#   temp_hash[:image_url] = row[67]
#   array_of_hashes << temp_hash
# end

# files = 0



# File.open("#{Rails.root}/lib/assets/scraped.txt", 'w') do |file|
#   array_of_hashes.each do |el|
#     files += 1
#     break if files > 1000 
#     file.puts(el.to_json)
#   end
# end

File.open("#{Rails.root}/lib/assets/scraped.txt", 'r') do |file|
  file.read.each_line do |line|
    
    next if line.include? 'Hunter/Killer'
    Game.create(JSON.parse(line))
  end
end

games = Game.all

# this is for creating the .jpgs based on a url (uses Mechanize gem)

# agent = Mechanize.new
# games.each do |game, i| 
#   #  
#   agent.get(game.image_url).save('app/assets/images/icon_images/' + game.title + "_pic.jpg")
# end

# this was for populating on localhost (unnecessary)

# games.each do |game| 
#   #  
#   file = File.open("#{Rails.root}/app/assets/images/icon_images/" + game.title + "_pic.jpg", 'r')
#   game.image.attach(io: file, filename: (game.id.to_s + ' ' + game.title + ' image.jpg'))
# end

# this is for pulling off of AWS.  Upload the files into a new bucket specifically for seeding by dumping the contents
# of your jpgs folder into it.

games.each do |game| 
  #  
  next if game.title.include? 'Beelzebub' 
  next if game.title.include? 'Orchestra' 
  puts game.title
  file = open("https://s3.amazonaws.com/goodplays-seeds/" + game.title.split.join('+') + "_pic.jpg")
  game.image.attach(io: file, filename: (game.id.to_s + ' ' + game.title + ' image.jpg'))
end

Game.all.each do |game|
  unless game.image.attached?
    game.destroy
  end
end