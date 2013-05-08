mission = {:body => 'body copy', :statement => 'statement'}

#Mission.create(mission)

thework = {:body => "Less of an outlet and more of an adhesive, HUM intends to bond together artists and writers from diverse backgrounds and influences.  Here are a few artists that we'll feature in Issue  (I):"}

#Thework.destroy_all
#Thework.create(thework)

artists = [
  {:name => 'Anna Leocha', :info => 'Filmmaker, Writer  / 23 / Jamaica Plain', :about => 'Lorem ipsum dolor sit amet, cum repudiare pertinacia et, omnis solum honestatis an vis. Mea admodum molestie percipitur in, ex his lucilius sapientem elaboraret.'},
  {:name => 'Shane Butler', :info => 'Musician, Poet / 24 / Jamainca Plain', :about => 'Lorem ipsum dolor sit amet, cum repudiare pertinacia et, omnis solum honestatis an vis. Mea admodum molestie percipitur in, ex his lucilius sapientem elaboraret. '},
  {:name => 'Megan Galeucia', :info => 'Painter / 23 / Brooklyn NY', :about => 'Lorem ipsum dolor sit amet, cum repudiare pertinacia et, omnis solum honestatis an vis. Mea admodum molestie percipitur in, ex his lucilius sapientem elaboraret. '}
]

artists.each do |artist|
  Artist.create(artist)
end