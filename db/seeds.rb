
mission = {:body => "HUM journal is a publication designed to share and archive the creative work of artists of all mediums in the Greater Boston area.  A small print publication that expands on its content and impact through an internet presence, we hope HUM will further facilitate and expose a culture of beauty-production and creative camaraderie in Boston.  

Each issue will pose a theme that can be interpreted as abstractly or pointedly as the artist wishes.  The collection will be curated by Anna and Holly.  Issue (I) will ask its contributors to reflect on “Boston.”  It being  a particularly provocative moment for Boston’s arts culture, we’re asking: ", :statement => 'What does it mean to be an artist in Boston? '}

Mission.destroy_all
Mission.create(mission)

thework = {:body => "Less of an outlet and more of an adhesive, HUM intends to bond together artists and writers from diverse backgrounds and influences.  Here are a few artists that we'll feature in Issue  (I):"}

Thework.destroy_all
Thework.create(thework)

artists = [
  {:name => 'Anna Leocha', :info => 'Filmmaker, Writer  / 23 / Jamaica Plain', :about => 'Lorem ipsum dolor sit amet, cum repudiare pertinacia et, omnis solum honestatis an vis. Mea admodum molestie percipitur in, ex his lucilius sapientem elaboraret.'},
  {:name => 'Shane Butler', :info => 'Musician, Poet / 24 / Jamainca Plain', :about => 'Lorem ipsum dolor sit amet, cum repudiare pertinacia et, omnis solum honestatis an vis. Mea admodum molestie percipitur in, ex his lucilius sapientem elaboraret. '},
  {:name => 'Megan Galeucia', :info => 'Painter / 23 / Brooklyn NY', :about => 'Lorem ipsum dolor sit amet, cum repudiare pertinacia et, omnis solum honestatis an vis. Mea admodum molestie percipitur in, ex his lucilius sapientem elaboraret. '}
]

Artist.destroy_all
artists.each do |artist|
  Artist.create(artist)
end
