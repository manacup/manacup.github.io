const localitats = [
  {
    "localitat": "Escola Puig d'Alanar, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.472788,3.244598",
    "lat": 39.472788,
    "long": 3.244598
  },
  {
    "localitat": "Can Lliro, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5709609,3.2078117",
    "lat": 39.5709609,
    "long": 3.2078117
  },
  {
    "localitat": "Mig i mig, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694885,3.209471",
    "lat": 39.5694885,
    "long": 3.209471
  },
  {
    "localitat": "Es Celler, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5724283,3.2172494",
    "lat": 39.5724283,
    "long": 3.2172494
  },
  {
    "localitat": "Molí den Beió, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5751843,3.2124691",
    "lat": 39.5751843,
    "long": 3.2124691
  },
  {
    "localitat": "Bar Sa Torre, El Xiringuito, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5568084,3.2186532",
    "lat": 39.5568084,
    "long": 3.2186532
  },
  {
    "localitat": "Aeroport de Son Santjoan, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.55247079999999,2.7393803",
    "lat": 39.55247079999999,
    "long": 2.7393803
  },
  {
    "localitat": "Aiamans, Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7180877,2.8668197",
    "lat": 39.7180877,
    "long": 2.8668197
  },
  {
    "localitat": "Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7073368,2.7916752",
    "lat": 39.7073368,
    "long": 2.7916752
  },
  {
    "localitat": "Alcanada, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.836721,3.1531327",
    "lat": 39.836721,
    "long": 3.1531327
  },
  {
    "localitat": "Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "Algaida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5601816,2.8918657",
    "lat": 39.5601816,
    "long": 2.8918657
  },
  {
    "localitat": "Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "Ariany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.650895,3.1121146",
    "lat": 39.650895,
    "long": 3.1121146
  },
  {
    "localitat": "Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6946608,3.3509152",
    "lat": 39.6946608,
    "long": 3.3509152
  },
  {
    "localitat": "Baix de la Vila, Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=39.59372279999999,3.0401865",
    "lat": 39.59372279999999,
    "long": 3.0401865
  },
  {
    "localitat": "Baix del Cós, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "Baix del Penyal, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "Baix del Puig, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6614389,2.7321615",
    "lat": 39.6614389,
    "long": 2.7321615
  },
  {
    "localitat": "Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6812154,2.5247449",
    "lat": 39.6812154,
    "long": 2.5247449
  },
  {
    "localitat": "Bellavista, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.479444,2.733333",
    "lat": 39.479444,
    "long": 2.733333
  },
  {
    "localitat": "Bellavista, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6032125,2.6137229",
    "lat": 39.6032125,
    "long": 2.6137229
  },
  {
    "localitat": "Bendinat, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5348383,2.5791129",
    "lat": 39.5348383,
    "long": 2.5791129
  },
  {
    "localitat": "Benestar, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248589,2.7277741",
    "lat": 39.6248589,
    "long": 2.7277741
  },
  {
    "localitat": "Betlem, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7527659,3.3174882",
    "lat": 39.7527659,
    "long": 3.3174882
  },
  {
    "localitat": "Biniagual, Binissalem",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6671225,2.8756369",
    "lat": 39.6671225,
    "long": 2.8756369
  },
  {
    "localitat": "Biniali, Sencelles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6410692,2.859291",
    "lat": 39.6410692,
    "long": 2.859291
  },
  {
    "localitat": "Biniamar, Selva",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7308251,2.8717393",
    "lat": 39.7308251,
    "long": 2.8717393
  },
  {
    "localitat": "Biniaraix, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.77102410000001,2.7348209",
    "lat": 39.77102410000001,
    "long": 2.7348209
  },
  {
    "localitat": "Biniarroi, Mancor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7492004,2.8699668",
    "lat": 39.7492004,
    "long": 2.8699668
  },
  {
    "localitat": "Binibona, Selva",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7838789,2.9200242",
    "lat": 39.7838789,
    "long": 2.9200242
  },
  {
    "localitat": "Biniorella, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5510778,2.4213481",
    "lat": 39.5510778,
    "long": 2.4213481
  },
  {
    "localitat": "Binissalem",
    "url": "https://www.google.com/maps/search/?api=1&query=39.68803500000001,2.8439975",
    "lat": 39.68803500000001,
    "long": 2.8439975
  },
  {
    "localitat": "Bonaire, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8634597,3.1509874",
    "lat": 39.8634597,
    "long": 3.1509874
  },
  {
    "localitat": "Bons Aires, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.581754,2.6474675",
    "lat": 39.581754,
    "long": 2.6474675
  },
  {
    "localitat": "Bóquer, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.92900460000001,3.0944767",
    "lat": 39.92900460000001,
    "long": 3.0944767
  },
  {
    "localitat": "Búger",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7585631,2.9844311",
    "lat": 39.7585631,
    "long": 2.9844311
  },
  {
    "localitat": "Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "Ca l'Abat, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "Ca l'Amo Arnau, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Ca l'Anglès, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "Ca l'Hereu, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6201493,3.3603044",
    "lat": 39.6201493,
    "long": 3.3603044
  },
  {
    "localitat": "Ca les Lluïses, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Ca les Monnares, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8771541,3.018908",
    "lat": 39.8771541,
    "long": 3.018908
  },
  {
    "localitat": "Ca na Blaieta, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Ca na Ferrera, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.855397,3.1231766",
    "lat": 39.855397,
    "long": 3.1231766
  },
  {
    "localitat": "Ca na Gavena, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Ca na Saloma, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "Ca na Verda, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6133721,2.6298473",
    "lat": 39.6133721,
    "long": 2.6298473
  },
  {
    "localitat": "Ca na Vicença, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "Ca na Vinagre, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5725452,2.6884352",
    "lat": 39.5725452,
    "long": 2.6884352
  },
  {
    "localitat": "Caimari, Selva",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7712553,2.9023052",
    "lat": 39.7712553,
    "long": 2.9023052
  },
  {
    "localitat": "Cal Binissalemer, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "Cal Boll, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426384,2.7517996",
    "lat": 39.6426384,
    "long": 2.7517996
  },
  {
    "localitat": "Cal Capiscol, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Cal Capità, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248589,2.7277741",
    "lat": 39.6248589,
    "long": 2.7277741
  },
  {
    "localitat": "Cal Castellà, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Cal Català Nou, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5652234,2.504203200000001",
    "lat": 39.5652234,
    "long": 2.504203200000001
  },
  {
    "localitat": "Cal Català Vell, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5652234,2.504203200000001",
    "lat": 39.5652234,
    "long": 2.504203200000001
  },
  {
    "localitat": "Cal Català, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5652234,2.504203200000001",
    "lat": 39.5652234,
    "long": 2.504203200000001
  },
  {
    "localitat": "Cal Corso, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "Cal Ferrer, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Cal Fosser, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Cal Metge Nou, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5969325,2.6926732",
    "lat": 39.5969325,
    "long": 2.6926732
  },
  {
    "localitat": "Cal Metge, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6115567,2.7063055",
    "lat": 39.6115567,
    "long": 2.7063055
  },
  {
    "localitat": "Cal Miot, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426384,2.7517996",
    "lat": 39.6426384,
    "long": 2.7517996
  },
  {
    "localitat": "Cal Molí, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "Cal Patró, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6166392,2.6440061",
    "lat": 39.6166392,
    "long": 2.6440061
  },
  {
    "localitat": "Cal Reiet, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.35541250000001,3.1349868",
    "lat": 39.35541250000001,
    "long": 3.1349868
  },
  {
    "localitat": "Cal Tamborer, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Cal Teixidor, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248589,2.7277741",
    "lat": 39.6248589,
    "long": 2.7277741
  },
  {
    "localitat": "Cala Anguila, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "Cala Antena, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4697107,3.2765245",
    "lat": 39.4697107,
    "long": 3.2765245
  },
  {
    "localitat": "Cala Blava, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4828874,2.7367425",
    "lat": 39.4828874,
    "long": 2.7367425
  },
  {
    "localitat": "Cala Bona, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6201493,3.3603044",
    "lat": 39.6201493,
    "long": 3.3603044
  },
  {
    "localitat": "Cala Carbó, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.9235238,3.0692836",
    "lat": 39.9235238,
    "long": 3.0692836
  },
  {
    "localitat": "Cala d'Or, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.372606,3.22914",
    "lat": 39.372606,
    "long": 3.22914
  },
  {
    "localitat": "Cala de Deià, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7601701,2.64093",
    "lat": 39.7601701,
    "long": 2.64093
  },
  {
    "localitat": "Cala de Sant Vicenç, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.9181224,3.0539369",
    "lat": 39.9181224,
    "long": 3.0539369
  },
  {
    "localitat": "Cala Egües, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3611125,3.2244407",
    "lat": 39.3611125,
    "long": 3.2244407
  },
  {
    "localitat": "Cala Estància, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5347829,2.7133948",
    "lat": 39.5347829,
    "long": 2.7133948
  },
  {
    "localitat": "Cala Ferrera, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3801284,3.2387288",
    "lat": 39.3801284,
    "long": 3.2387288
  },
  {
    "localitat": "Cala Figuera, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3301575,3.1685531",
    "lat": 39.3301575,
    "long": 3.1685531
  },
  {
    "localitat": "Cala Fornells, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5346626,2.4429494",
    "lat": 39.5346626,
    "long": 2.4429494
  },
  {
    "localitat": "Cala Gamba, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5454781,2.698257700000001",
    "lat": 39.5454781,
    "long": 2.698257700000001
  },
  {
    "localitat": "Cala Gat, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7131796,3.4722424",
    "lat": 39.7131796,
    "long": 3.4722424
  },
  {
    "localitat": "Cala Gran, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.372606,3.22914",
    "lat": 39.372606,
    "long": 3.22914
  },
  {
    "localitat": "Cala Lliteres, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7186945,3.4630408",
    "lat": 39.7186945,
    "long": 3.4630408
  },
  {
    "localitat": "Cala Llombards, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3190405,3.1300844",
    "lat": 39.3190405,
    "long": 3.1300844
  },
  {
    "localitat": "Cala Llonga, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3713864,3.2227356",
    "lat": 39.3713864,
    "long": 3.2227356
  },
  {
    "localitat": "Cala Magrana, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.52688990000001,3.3243544",
    "lat": 39.52688990000001,
    "long": 3.3243544
  },
  {
    "localitat": "Cala Major, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5521314,2.6127008",
    "lat": 39.5521314,
    "long": 2.6127008
  },
  {
    "localitat": "Cala Marçal, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.408345,3.2588208",
    "lat": 39.408345,
    "long": 3.2588208
  },
  {
    "localitat": "Cala Mendia, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "Cala Mesquida, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.74374359999999,3.4290138",
    "lat": 39.74374359999999,
    "long": 3.4290138
  },
  {
    "localitat": "Cala Millor, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6043024,3.3783644",
    "lat": 39.6043024,
    "long": 3.3783644
  },
  {
    "localitat": "Cala Moragues, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "Cala Morlanda, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.562394,3.3722744",
    "lat": 39.562394,
    "long": 3.3722744
  },
  {
    "localitat": "Cala Murada, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4488079,3.2682148",
    "lat": 39.4488079,
    "long": 3.2682148
  },
  {
    "localitat": "Cala Pi, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3668342,2.8485324",
    "lat": 39.3668342,
    "long": 2.8485324
  },
  {
    "localitat": "Cala Provençals, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.674583,3.45089",
    "lat": 39.674583,
    "long": 3.45089
  },
  {
    "localitat": "Cala Rajada, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7100398,3.4566911",
    "lat": 39.7100398,
    "long": 3.4566911
  },
  {
    "localitat": "Cala Santanyí, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3321314,3.1434612",
    "lat": 39.3321314,
    "long": 3.1434612
  },
  {
    "localitat": "Cala Serena, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3797428,3.2428957",
    "lat": 39.3797428,
    "long": 3.2428957
  },
  {
    "localitat": "Cala Tuent, Escorca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8416496,2.7798106",
    "lat": 39.8416496,
    "long": 2.7798106
  },
  {
    "localitat": "Cala Vinyes, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4949446,2.5288899",
    "lat": 39.4949446,
    "long": 2.5288899
  },
  {
    "localitat": "Cales de Mallorca, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5053018,3.2346145",
    "lat": 39.5053018,
    "long": 3.2346145
  },
  {
    "localitat": "Calonge, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4004201,3.2037035",
    "lat": 39.4004201,
    "long": 3.2037035
  },
  {
    "localitat": "Cals Binissalemers, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248589,2.7277741",
    "lat": 39.6248589,
    "long": 2.7277741
  },
  {
    "localitat": "Cals Capellers, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "Cals Saboners, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.514261,2.5351915",
    "lat": 39.514261,
    "long": 2.5351915
  },
  {
    "localitat": "Calvari, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5652234,2.504203200000001",
    "lat": 39.5652234,
    "long": 2.504203200000001
  },
  {
    "localitat": "Camarata, Selva",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Camí de la Cadena, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Camí de na Cerdana, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6096683,2.6778097",
    "lat": 39.6096683,
    "long": 2.6778097
  },
  {
    "localitat": "Camí del Clot, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Camí del Destre, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6357803,2.660565",
    "lat": 39.6357803,
    "long": 2.660565
  },
  {
    "localitat": "Camp de Mar, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.541667,2.423889",
    "lat": 39.541667,
    "long": 2.423889
  },
  {
    "localitat": "Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7758332,2.9631835",
    "lat": 39.7758332,
    "long": 2.9631835
  },
  {
    "localitat": "Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4325674,3.0187739",
    "lat": 39.4325674,
    "long": 3.0187739
  },
  {
    "localitat": "Can Arboç, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5707321,2.6531835",
    "lat": 39.5707321,
    "long": 2.6531835
  },
  {
    "localitat": "Can Bibiloni, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Can Blancos, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.721548,2.92752",
    "lat": 39.721548,
    "long": 2.92752
  },
  {
    "localitat": "Can Borralló, Santa Maria del Camí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6486796,2.7748885",
    "lat": 39.6486796,
    "long": 2.7748885
  },
  {
    "localitat": "Can Borràs, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5900554,2.3639622",
    "lat": 39.5900554,
    "long": 2.3639622
  },
  {
    "localitat": "Can Brusca, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5693831,2.8519607",
    "lat": 39.5693831,
    "long": 2.8519607
  },
  {
    "localitat": "Can Buc, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6148818,2.6809664",
    "lat": 39.6148818,
    "long": 2.6809664
  },
  {
    "localitat": "Can Butxaques, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Can Capdebou, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8634633,3.0936887",
    "lat": 39.8634633,
    "long": 3.0936887
  },
  {
    "localitat": "Can Capes, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5815742,2.669505",
    "lat": 39.5815742,
    "long": 2.669505
  },
  {
    "localitat": "Can Carbonell, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6095433,2.6947902",
    "lat": 39.6095433,
    "long": 2.6947902
  },
  {
    "localitat": "Can Casta, Petra",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6097601,3.1137891",
    "lat": 39.6097601,
    "long": 3.1137891
  },
  {
    "localitat": "Can Cirerol, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4250207,3.2308979",
    "lat": 39.4250207,
    "long": 3.2308979
  },
  {
    "localitat": "Can Corb, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6276273,3.3579757",
    "lat": 39.6276273,
    "long": 3.3579757
  },
  {
    "localitat": "Can Cullerassa, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8771939,3.0162026",
    "lat": 39.8771939,
    "long": 3.0162026
  },
  {
    "localitat": "Can Domenge, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.584369,2.6452958",
    "lat": 39.584369,
    "long": 2.6452958
  },
  {
    "localitat": "Can Enric, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6141198,2.673974",
    "lat": 39.6141198,
    "long": 2.673974
  },
  {
    "localitat": "Can Estela, Campos",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Can Figó, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Can Fortesa, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8518696,3.1267274",
    "lat": 39.8518696,
    "long": 3.1267274
  },
  {
    "localitat": "Can Gaià, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.424319,3.229794",
    "lat": 39.424319,
    "long": 3.229794
  },
  {
    "localitat": "Can Garriga, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6099058,2.7737964",
    "lat": 39.6099058,
    "long": 2.7737964
  },
  {
    "localitat": "Can Guidet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5810751,2.7073109",
    "lat": 39.5810751,
    "long": 2.7073109
  },
  {
    "localitat": "Can López, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6890373,2.8405953",
    "lat": 39.6890373,
    "long": 2.8405953
  },
  {
    "localitat": "Can Mandana, Campos",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Can Matzarí, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7164103,2.91505",
    "lat": 39.7164103,
    "long": 2.91505
  },
  {
    "localitat": "Can Membre, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5980626,2.7076206",
    "lat": 39.5980626,
    "long": 2.7076206
  },
  {
    "localitat": "Can Pastilla, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5372527,2.7170482",
    "lat": 39.5372527,
    "long": 2.7170482
  },
  {
    "localitat": "Can Pere Antoni, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5624544,2.6622873",
    "lat": 39.5624544,
    "long": 2.6622873
  },
  {
    "localitat": "Can Pere Ignasi, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3824076,3.0193989",
    "lat": 39.3824076,
    "long": 3.0193989
  },
  {
    "localitat": "Can Peublanc, Sa Pobla",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7681192,3.0189656",
    "lat": 39.7681192,
    "long": 3.0189656
  },
  {
    "localitat": "Can Picafort, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.765027,3.1541237",
    "lat": 39.765027,
    "long": 3.1541237
  },
  {
    "localitat": "Can Pol, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5933162,2.6903666",
    "lat": 39.5933162,
    "long": 2.6903666
  },
  {
    "localitat": "Can Putxet, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6198569,2.7485794",
    "lat": 39.6198569,
    "long": 2.7485794
  },
  {
    "localitat": "Can Roses, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5784741,2.7064815",
    "lat": 39.5784741,
    "long": 2.7064815
  },
  {
    "localitat": "Can Rosset, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Can Rubiol, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426384,2.7517996",
    "lat": 39.6426384,
    "long": 2.7517996
  },
  {
    "localitat": "Can Singala, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.9119759,3.0966734",
    "lat": 39.9119759,
    "long": 3.0966734
  },
  {
    "localitat": "Can Sionet, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6275837,2.6901266",
    "lat": 39.6275837,
    "long": 2.6901266
  },
  {
    "localitat": "Can Teuler, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Can Tro, Sa Pobla",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7697384,3.0250778",
    "lat": 39.7697384,
    "long": 3.0250778
  },
  {
    "localitat": "Can Valent, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5967473,2.6152396",
    "lat": 39.5967473,
    "long": 2.6152396
  },
  {
    "localitat": "Can Valero, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5976281,2.6338495",
    "lat": 39.5976281,
    "long": 2.6338495
  },
  {
    "localitat": "Can Vell del Porc, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5622818,2.606316",
    "lat": 39.5622818,
    "long": 2.606316
  },
  {
    "localitat": "Canyamel, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.658455,3.4391076",
    "lat": 39.658455,
    "long": 3.4391076
  },
  {
    "localitat": "Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7023646,3.4353222",
    "lat": 39.7023646,
    "long": 3.4353222
  },
  {
    "localitat": "Cas Concos, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4190835,3.1359362",
    "lat": 39.4190835,
    "long": 3.1359362
  },
  {
    "localitat": "Cascanar, Sencelles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6381304,2.9204044",
    "lat": 39.6381304,
    "long": 2.9204044
  },
  {
    "localitat": "Club del Sol, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8796028,3.0796722",
    "lat": 39.8796028,
    "long": 3.0796722
  },
  {
    "localitat": "Colònia de Sant Jordi, les Salines",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3172741,2.993808",
    "lat": 39.3172741,
    "long": 2.993808
  },
  {
    "localitat": "Colònia de Sant Pere, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7377666,3.2791114",
    "lat": 39.7377666,
    "long": 3.2791114
  },
  {
    "localitat": "Conques, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6272019,2.5283318",
    "lat": 39.6272019,
    "long": 2.5283318
  },
  {
    "localitat": "Consell",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6640641,2.8228124",
    "lat": 39.6640641,
    "long": 2.8228124
  },
  {
    "localitat": "Corea, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6113236,3.2854006",
    "lat": 39.6113236,
    "long": 3.2854006
  },
  {
    "localitat": "Costitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6564158,2.94944",
    "lat": 39.6564158,
    "long": 2.94944
  },
  {
    "localitat": "Crestatx, Sa Pobla",
    "url": "https://www.google.com/maps/search/?api=1&query=39.807897,3.0223436",
    "lat": 39.807897,
    "long": 3.0223436
  },
  {
    "localitat": "Crist Rei Nou, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7164103,2.91505",
    "lat": 39.7164103,
    "long": 2.91505
  },
  {
    "localitat": "Crist Rei, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7155054,2.902307",
    "lat": 39.7155054,
    "long": 2.902307
  },
  {
    "localitat": "Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "Dellà el Torrent, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "el Babo, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "el Barcarès, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "el Barracar, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "el Barranc, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "el Blanquer, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7204436,2.9021536",
    "lat": 39.7204436,
    "long": 2.9021536
  },
  {
    "localitat": "el Caló d'en Boira, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3348844,3.1704225",
    "lat": 39.3348844,
    "long": 3.1704225
  },
  {
    "localitat": "el Calvari, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.88028610000001,3.0119383",
    "lat": 39.88028610000001,
    "long": 3.0119383
  },
  {
    "localitat": "el Camp d'en Pineta, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "el Camp d'en Serralta, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5761279,2.6394",
    "lat": 39.5761279,
    "long": 2.6394
  },
  {
    "localitat": "el Camp d'Inca, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "el Camp Redó, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "el Camp Roig, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5901034,2.6444454",
    "lat": 39.5901034,
    "long": 2.6444454
  },
  {
    "localitat": "el Camp, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6875579,2.5145326",
    "lat": 39.6875579,
    "long": 2.5145326
  },
  {
    "localitat": "el Campet, Algaida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5601816,2.8918657",
    "lat": 39.5601816,
    "long": 2.8918657
  },
  {
    "localitat": "el Canyar, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "el Cap d'Amunt de la Vila, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6657184,2.579555",
    "lat": 39.6657184,
    "long": 2.579555
  },
  {
    "localitat": "el Cap del Moro, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3450468,3.1868447",
    "lat": 39.3450468,
    "long": 3.1868447
  },
  {
    "localitat": "el Capdellà, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5787022,2.4692829",
    "lat": 39.5787022,
    "long": 2.4692829
  },
  {
    "localitat": "el Cappuig, Porreres",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5148577,3.0238803",
    "lat": 39.5148577,
    "long": 3.0238803
  },
  {
    "localitat": "el Caragol, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.2785572,3.04338",
    "lat": 39.2785572,
    "long": 3.04338
  },
  {
    "localitat": "el Carregador, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7023646,3.4353222",
    "lat": 39.7023646,
    "long": 3.4353222
  },
  {
    "localitat": "el Carritxó, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4249404,3.2651011",
    "lat": 39.4249404,
    "long": 3.2651011
  },
  {
    "localitat": "el Castellot, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5652234,2.504203200000001",
    "lat": 39.5652234,
    "long": 2.504203200000001
  },
  {
    "localitat": "el Celler, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7657992,2.7198341",
    "lat": 39.7657992,
    "long": 2.7198341
  },
  {
    "localitat": "el Clot Fillol, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6201493,3.3603044",
    "lat": 39.6201493,
    "long": 3.3603044
  },
  {
    "localitat": "el Clot, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "el Coll d'en Rabassa, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5509478,2.6959016",
    "lat": 39.5509478,
    "long": 2.6959016
  },
  {
    "localitat": "el Collet Roig, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5766416,2.4218245",
    "lat": 39.5766416,
    "long": 2.4218245
  },
  {
    "localitat": "el Colomer, Algaida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5601816,2.8918657",
    "lat": 39.5601816,
    "long": 2.8918657
  },
  {
    "localitat": "el Comellar, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6875579,2.5145326",
    "lat": 39.6875579,
    "long": 2.5145326
  },
  {
    "localitat": "el Comtat, Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=38.78054059999999,-0.4372114",
    "lat": 38.78054059999999,
    "long": -0.4372114
  },
  {
    "localitat": "el Convent, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6946212,3.350928",
    "lat": 39.6946212,
    "long": 3.350928
  },
  {
    "localitat": "el Corb Marí, Palma",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "el Corral d'en Bennàsser, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "el Cós, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "el Cremat, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "el Dau, Montuïri",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5678386,2.9819797",
    "lat": 39.5678386,
    "long": 2.9819797
  },
  {
    "localitat": "el Figueral, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.624869,2.7274124",
    "lat": 39.624869,
    "long": 2.7274124
  },
  {
    "localitat": "el Fortí, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5792849,2.6425027",
    "lat": 39.5792849,
    "long": 2.6425027
  },
  {
    "localitat": "el Fortí, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3667934,3.2339008",
    "lat": 39.3667934,
    "long": 3.2339008
  },
  {
    "localitat": "el Fossar, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6433535,3.012055",
    "lat": 39.6433535,
    "long": 3.012055
  },
  {
    "localitat": "el Garrigó, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6914928,2.701881",
    "lat": 39.6914928,
    "long": 2.701881
  },
  {
    "localitat": "el Garroveral, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "el Guix, Escorca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.82614969999999,2.8472695",
    "lat": 39.82614969999999,
    "long": 2.8472695
  },
  {
    "localitat": "el Jardí del Rei, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "el Jonquet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5700586,2.6366077",
    "lat": 39.5700586,
    "long": 2.6366077
  },
  {
    "localitat": "el Llatzeret, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "el Mal Pas, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.862691,3.142323",
    "lat": 39.862691,
    "long": 3.142323
  },
  {
    "localitat": "el Marge, Petra",
    "url": "https://www.google.com/maps/search/?api=1&query=30.3284544,35.4443622",
    "lat": 30.3284544,
    "long": 35.4443622
  },
  {
    "localitat": "el Mercadal, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "el Mirador de Son Bujosa, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "el Mirador, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6435845,3.0114943",
    "lat": 39.6435845,
    "long": 3.0114943
  },
  {
    "localitat": "el Mirant de Mar, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "el Molí d'en Font, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5742364,2.638926",
    "lat": 39.5742364,
    "long": 2.638926
  },
  {
    "localitat": "el Molí de Síller, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8771939,3.0162026",
    "lat": 39.8771939,
    "long": 3.0162026
  },
  {
    "localitat": "el Molinar, Montuïri",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5629906,2.9814057",
    "lat": 39.5629906,
    "long": 2.9814057
  },
  {
    "localitat": "el Molinot, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8526903,3.1253255",
    "lat": 39.8526903,
    "long": 3.1253255
  },
  {
    "localitat": "el Moll, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532292,3.1228642",
    "lat": 39.8532292,
    "long": 3.1228642
  },
  {
    "localitat": "el Morer Vermell, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8605683,3.1222179",
    "lat": 39.8605683,
    "long": 3.1222179
  },
  {
    "localitat": "el Morull, Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7195146,2.8658673",
    "lat": 39.7195146,
    "long": 2.8658673
  },
  {
    "localitat": "el Nogueral, Valldemossa",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7114523,2.6225698",
    "lat": 39.7114523,
    "long": 2.6225698
  },
  {
    "localitat": "el Pantaleu, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.576878,2.3477444",
    "lat": 39.576878,
    "long": 2.3477444
  },
  {
    "localitat": "el Pas, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.49084390000001,2.8916657",
    "lat": 39.49084390000001,
    "long": 2.8916657
  },
  {
    "localitat": "el Penyal, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6875579,2.5145326",
    "lat": 39.6875579,
    "long": 2.5145326
  },
  {
    "localitat": "el Penyalar, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3782695,3.2441809",
    "lat": 39.3782695,
    "long": 3.2441809
  },
  {
    "localitat": "el Pil·larí, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5280146,2.7549374",
    "lat": 39.5280146,
    "long": 2.7549374
  },
  {
    "localitat": "el Pinaret, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5870773,2.7380503",
    "lat": 39.5870773,
    "long": 2.7380503
  },
  {
    "localitat": "el Pla de la Coma, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "el Pla de la Sínia, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "el Pla de na Tesa, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5983963,2.7095716",
    "lat": 39.5983963,
    "long": 2.7095716
  },
  {
    "localitat": "el Pla de Peguera, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.53964819999999,2.4468177",
    "lat": 39.53964819999999,
    "long": 2.4468177
  },
  {
    "localitat": "el Planet, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6272019,2.5283318",
    "lat": 39.6272019,
    "long": 2.5283318
  },
  {
    "localitat": "el Poble Nou, Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=41.4033546,2.2028843",
    "lat": 41.4033546,
    "long": 2.2028843
  },
  {
    "localitat": "el Pont d'Inca Nou, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.598095,2.691736",
    "lat": 39.598095,
    "long": 2.691736
  },
  {
    "localitat": "el Pont d'Inca, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.598095,2.691736",
    "lat": 39.598095,
    "long": 2.691736
  },
  {
    "localitat": "el Pontarró, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7076423,2.7913437",
    "lat": 39.7076423,
    "long": 2.7913437
  },
  {
    "localitat": "el Porrassar, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7073368,2.7916752",
    "lat": 39.7073368,
    "long": 2.7916752
  },
  {
    "localitat": "el Porrassaret, les Salines",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "el Port del Canonge, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6987225,2.5552765",
    "lat": 39.6987225,
    "long": 2.5552765
  },
  {
    "localitat": "el Port Nou, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6300645,3.3976808",
    "lat": 39.6300645,
    "long": 3.3976808
  },
  {
    "localitat": "el Port Roig, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6201493,3.3603044",
    "lat": 39.6201493,
    "long": 3.3603044
  },
  {
    "localitat": "el Port Vell, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6326584,3.399742",
    "lat": 39.6326584,
    "long": 3.399742
  },
  {
    "localitat": "el Port Verd, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6246575,3.3957433",
    "lat": 39.6246575,
    "long": 3.3957433
  },
  {
    "localitat": "el Portitxol, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.561846,2.670663",
    "lat": 39.561846,
    "long": 2.670663
  },
  {
    "localitat": "el Portitxolet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.561846,2.670663",
    "lat": 39.561846,
    "long": 2.670663
  },
  {
    "localitat": "el Pou Amunt, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "el Pou d'Amunt, Porreres",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5148577,3.0238803",
    "lat": 39.5148577,
    "long": 3.0238803
  },
  {
    "localitat": "el Pou Florit, Porreres",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5142864,3.025874",
    "lat": 39.5142864,
    "long": 3.025874
  },
  {
    "localitat": "el Pou Llarg, Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5963621,3.0392509",
    "lat": 39.5963621,
    "long": 3.0392509
  },
  {
    "localitat": "el Pou Nou, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=42.7101585,2.4584437",
    "lat": 42.7101585,
    "long": 2.4584437
  },
  {
    "localitat": "el Pou Vell, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6111694,3.2878597",
    "lat": 39.6111694,
    "long": 3.2878597
  },
  {
    "localitat": "el Prat, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=41.3219711,2.094757",
    "lat": 41.3219711,
    "long": 2.094757
  },
  {
    "localitat": "el Puget, Santa Eugènia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6230688,2.8383888",
    "lat": 39.6230688,
    "long": 2.8383888
  },
  {
    "localitat": "el Puig de Sant Nicolau, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "el Puig de Sant Pere, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5699322,2.6421924",
    "lat": 39.5699322,
    "long": 2.6421924
  },
  {
    "localitat": "el Puig de Son Talent, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5875673,3.2239708",
    "lat": 39.5875673,
    "long": 3.2239708
  },
  {
    "localitat": "el Puig Verd, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4753406,3.1434325",
    "lat": 39.4753406,
    "long": 3.1434325
  },
  {
    "localitat": "el Puig, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "el Puigderrós, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4500328,2.7514831",
    "lat": 39.4500328,
    "long": 2.7514831
  },
  {
    "localitat": "el Racó, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "el Rafal Garcés, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7164103,2.91505",
    "lat": 39.7164103,
    "long": 2.91505
  },
  {
    "localitat": "el Rafal Negre, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6536597,2.7235308",
    "lat": 39.6536597,
    "long": 2.7235308
  },
  {
    "localitat": "el Rafal Nou, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5841721,2.6828567",
    "lat": 39.5841721,
    "long": 2.6828567
  },
  {
    "localitat": "el Rafal Vell, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5837122,2.6747831",
    "lat": 39.5837122,
    "long": 2.6747831
  },
  {
    "localitat": "el Rafal, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "el Rafalet, Costitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6564158,2.94944",
    "lat": 39.6564158,
    "long": 2.94944
  },
  {
    "localitat": "el Rotlet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.558723,2.6808173",
    "lat": 39.558723,
    "long": 2.6808173
  },
  {
    "localitat": "el Sagrat Cor, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5750519,2.6267422",
    "lat": 39.5750519,
    "long": 2.6267422
  },
  {
    "localitat": "el Salt del Ca, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "el Secar de la Real, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6067097,2.6412522",
    "lat": 39.6067097,
    "long": 2.6412522
  },
  {
    "localitat": "el Secar de Son Sardina, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6193855,2.655106",
    "lat": 39.6193855,
    "long": 2.655106
  },
  {
    "localitat": "el Sementer, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.363171,3.21607",
    "lat": 39.363171,
    "long": 3.21607
  },
  {
    "localitat": "el Serral, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.72755859999999,2.9084633",
    "lat": 39.72755859999999,
    "long": 2.9084633
  },
  {
    "localitat": "el Serralt, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.562088,3.2107334",
    "lat": 39.562088,
    "long": 3.2107334
  },
  {
    "localitat": "el Tancat d'en Xorquet, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=41.2190006,1.5289562",
    "lat": 41.2190006,
    "long": 1.5289562
  },
  {
    "localitat": "el Terreno, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.56160209999999,2.6251302",
    "lat": 39.56160209999999,
    "long": 2.6251302
  },
  {
    "localitat": "el Toro, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.48463539999999,2.4814357",
    "lat": 39.48463539999999,
    "long": 2.4814357
  },
  {
    "localitat": "el Torrent, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "el Través, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "el Tren, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "el Velar, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3570039,3.124147",
    "lat": 39.3570039,
    "long": 3.124147
  },
  {
    "localitat": "el Verger, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "el Vidriell, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8493928,3.1267874",
    "lat": 39.8493928,
    "long": 3.1267874
  },
  {
    "localitat": "el Vilar, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.899073,3.0573305",
    "lat": 39.899073,
    "long": 3.0573305
  },
  {
    "localitat": "els Aljubs, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6558649,2.9489389",
    "lat": 39.6558649,
    "long": 2.9489389
  },
  {
    "localitat": "els Balladors, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6648317,2.5807549",
    "lat": 39.6648317,
    "long": 2.5807549
  },
  {
    "localitat": "els Béns d'Avall, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7765719,2.6666189",
    "lat": 39.7765719,
    "long": 2.6666189
  },
  {
    "localitat": "els Caülls, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.63197220000001,2.7365467",
    "lat": 39.63197220000001,
    "long": 2.7365467
  },
  {
    "localitat": "els Cellers, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "els Cocons, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "els Domingos Gran, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "els Domingos Petit, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "els Garrovers, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.627909,2.7025869",
    "lat": 39.627909,
    "long": 2.7025869
  },
  {
    "localitat": "els Hostalets, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5807552,2.6629858",
    "lat": 39.5807552,
    "long": 2.6629858
  },
  {
    "localitat": "els Hostals, Santa Maria del Camí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6511158,2.773231",
    "lat": 39.6511158,
    "long": 2.773231
  },
  {
    "localitat": "els Llombards, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3412111,3.0945694",
    "lat": 39.3412111,
    "long": 3.0945694
  },
  {
    "localitat": "els Pelats, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7177976,3.465613",
    "lat": 39.7177976,
    "long": 3.465613
  },
  {
    "localitat": "els Placers, les Salines",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "els Pujols, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6946608,3.3509152",
    "lat": 39.6946608,
    "long": 3.3509152
  },
  {
    "localitat": "els Terrers, Porreres",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5111567,3.0255102",
    "lat": 39.5111567,
    "long": 3.0255102
  },
  {
    "localitat": "Escorca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.82614969999999,2.8472695",
    "lat": 39.82614969999999,
    "long": 2.8472695
  },
  {
    "localitat": "Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "Establiments Nous, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6329439,2.6090043",
    "lat": 39.6329439,
    "long": 2.6090043
  },
  {
    "localitat": "Establiments Vells, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6329439,2.6090043",
    "lat": 39.6329439,
    "long": 2.6090043
  },
  {
    "localitat": "Establiments, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6329439,2.6090043",
    "lat": 39.6329439,
    "long": 2.6090043
  },
  {
    "localitat": "Estellencs",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6534687,2.4811265",
    "lat": 39.6534687,
    "long": 2.4811265
  },
  {
    "localitat": "Fartàritx, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5647569,3.2136891",
    "lat": 39.5647569,
    "long": 3.2136891
  },
  {
    "localitat": "Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "Formentor, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.95017199999999,3.1955414",
    "lat": 39.95017199999999,
    "long": 3.1955414
  },
  {
    "localitat": "Fornalutx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7822419,2.7409655",
    "lat": 39.7822419,
    "long": 2.7409655
  },
  {
    "localitat": "Galatzó, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5238947,2.4982445",
    "lat": 39.5238947,
    "long": 2.4982445
  },
  {
    "localitat": "Galilea, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6110697,2.5055001",
    "lat": 39.6110697,
    "long": 2.5055001
  },
  {
    "localitat": "Gènova, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5644405,2.5998112",
    "lat": 39.5644405,
    "long": 2.5998112
  },
  {
    "localitat": "Goleta, Binissalem",
    "url": "https://www.google.com/maps/search/?api=1&query=39.68803500000001,2.8439975",
    "lat": 39.68803500000001,
    "long": 2.8439975
  },
  {
    "localitat": "Gotmar, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8999301,3.070284",
    "lat": 39.8999301,
    "long": 3.070284
  },
  {
    "localitat": "Illetes, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.53921400000001,2.5914696",
    "lat": 39.53921400000001,
    "long": 2.5914696
  },
  {
    "localitat": "Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7164103,2.91505",
    "lat": 39.7164103,
    "long": 2.91505
  },
  {
    "localitat": "Jornets, Sencelles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6774379,2.9363346",
    "lat": 39.6774379,
    "long": 2.9363346
  },
  {
    "localitat": "l'Abeurador, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7052539,3.1060899",
    "lat": 39.7052539,
    "long": 3.1060899
  },
  {
    "localitat": "l'Aigua Dolça, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5646951,2.6271684",
    "lat": 39.5646951,
    "long": 2.6271684
  },
  {
    "localitat": "l'Aljub, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "l'Almunia, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "l'Alou, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "l'Alqueria Blanca, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3876139,3.1653968",
    "lat": 39.3876139,
    "long": 3.1653968
  },
  {
    "localitat": "l'Alqueria del Comte, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7684477,2.7217068",
    "lat": 39.7684477,
    "long": 2.7217068
  },
  {
    "localitat": "l'Alzinar de Sant Vicenç, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8771939,3.0162026",
    "lat": 39.8771939,
    "long": 3.0162026
  },
  {
    "localitat": "l'Antiga, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "l'Antigor, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "l'Aranjassa, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5439146,2.775492",
    "lat": 39.5439146,
    "long": 2.775492
  },
  {
    "localitat": "l'Arenal, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4991953,2.7543376",
    "lat": 39.4991953,
    "long": 2.7543376
  },
  {
    "localitat": "l'Arracó, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "l'Empeltada, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "l'Ermita, Inca",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "l'Escaleta, Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5977119,3.0364252",
    "lat": 39.5977119,
    "long": 3.0364252
  },
  {
    "localitat": "l'Esgleieta, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "l'Estació, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "l'Estany d'en Mas, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5183706,3.3078415",
    "lat": 39.5183706,
    "long": 3.3078415
  },
  {
    "localitat": "l'Estany de Baix, Muro",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "l'Estany dels Ponts, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "l'Estany Major, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "l'Estanyol de Migjorn, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4907976,2.8917081",
    "lat": 39.4907976,
    "long": 2.8917081
  },
  {
    "localitat": "l'Estanyol, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6946212,3.350928",
    "lat": 39.6946212,
    "long": 3.350928
  },
  {
    "localitat": "l'Estret del Temps, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "l'Hort d'Enfora, Petra",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "l'Hort de Can Seu, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "l'Hort de la Plana, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "l'Hort de la Porta, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8429965,3.1329618",
    "lat": 39.8429965,
    "long": 3.1329618
  },
  {
    "localitat": "l'Hort de les Barreres, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "l'Hort del Ca, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "l'Hort del Coll, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "l'Hort del Gabre, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "l'Hort Nou, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "l'Horta, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "l'Horta, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "l'Hortet de Can Silis, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "l'Hospital, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6414119,3.0105332",
    "lat": 39.6414119,
    "long": 3.0105332
  },
  {
    "localitat": "l'Illot, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "l'Obac, Sa Pobla",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7697384,3.0250778",
    "lat": 39.7697384,
    "long": 3.0250778
  },
  {
    "localitat": "l'Olivaret, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5835917,2.7061157",
    "lat": 39.5835917,
    "long": 2.7061157
  },
  {
    "localitat": "l'Olivera, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5892727,2.6573986",
    "lat": 39.5892727,
    "long": 2.6573986
  },
  {
    "localitat": "la Barbacana, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Barca Trencada, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3531419,3.1991094",
    "lat": 39.3531419,
    "long": 3.1991094
  },
  {
    "localitat": "la Baronia, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6872493,2.513189",
    "lat": 39.6872493,
    "long": 2.513189
  },
  {
    "localitat": "la Bateria, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Boca d'Infern, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "la Bonanova, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5592981,2.6127252",
    "lat": 39.5592981,
    "long": 2.6127252
  },
  {
    "localitat": "la Cabana Nova [en lloc de Nova Cabana], Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.61253019999999,2.6868414",
    "lat": 39.61253019999999,
    "long": 2.6868414
  },
  {
    "localitat": "la Cabana, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "la Cabaneta, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6428055,2.7541801",
    "lat": 39.6428055,
    "long": 2.7541801
  },
  {
    "localitat": "la Cadernera, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5696853,2.7205765",
    "lat": 39.5696853,
    "long": 2.7205765
  },
  {
    "localitat": "la Calatrava, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.565791,2.6539845",
    "lat": 39.565791,
    "long": 2.6539845
  },
  {
    "localitat": "la Calobra, Escorca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8505341,2.7998841",
    "lat": 39.8505341,
    "long": 2.7998841
  },
  {
    "localitat": "la Canaleta, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6875579,2.5145326",
    "lat": 39.6875579,
    "long": 2.5145326
  },
  {
    "localitat": "la Capella, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Casa Blanca, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5679604,2.7552707",
    "lat": 39.5679604,
    "long": 2.7552707
  },
  {
    "localitat": "la Casa Nova, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "la Cavella, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Clota, Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7183392,2.8689332",
    "lat": 39.7183392,
    "long": 2.8689332
  },
  {
    "localitat": "la Coma del Puig Verd, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.66769439999999,2.6870648",
    "lat": 39.66769439999999,
    "long": 2.6870648
  },
  {
    "localitat": "la Coma, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "la Coma, Sant Llorenç del Cardassar",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Comuna de Can Fillol, Muro",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Comuna de Can Oliver, Muro",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Corona, Montuïri",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5678701,2.9819309",
    "lat": 39.5678701,
    "long": 2.9819309
  },
  {
    "localitat": "la Costa d'en Blanes, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.539788,2.5606603",
    "lat": 39.539788,
    "long": 2.5606603
  },
  {
    "localitat": "la Costa de Canyamel, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6626606,3.4198138",
    "lat": 39.6626606,
    "long": 3.4198138
  },
  {
    "localitat": "la Costa de la Calma, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5267228,2.469459800000001",
    "lat": 39.5267228,
    "long": 2.469459800000001
  },
  {
    "localitat": "la Costa de Son Jordi, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6024433,3.3852845",
    "lat": 39.6024433,
    "long": 3.3852845
  },
  {
    "localitat": "la Costa, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "la Cova, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6113236,3.2854006",
    "lat": 39.6113236,
    "long": 3.2854006
  },
  {
    "localitat": "la Creu d'en Rabassa, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "la Creu dels Morts, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6437544,3.0099877",
    "lat": 39.6437544,
    "long": 3.0099877
  },
  {
    "localitat": "la Creu Nova, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Creu Vermella, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.58124100000001,2.715825",
    "lat": 39.58124100000001,
    "long": 2.715825
  },
  {
    "localitat": "la Creueta, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7052539,3.1060899",
    "lat": 39.7052539,
    "long": 3.1060899
  },
  {
    "localitat": "la Creueta, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "la Duana, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696959,3.148297",
    "lat": 39.4696959,
    "long": 3.148297
  },
  {
    "localitat": "la Fertilitzadora, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5827196,2.6663032",
    "lat": 39.5827196,
    "long": 2.6663032
  },
  {
    "localitat": "la Figuera, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7966487,2.697718",
    "lat": 39.7966487,
    "long": 2.697718
  },
  {
    "localitat": "la Filadora, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "la Finca, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "la Font de la Cala, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6818159,3.4522518",
    "lat": 39.6818159,
    "long": 3.4522518
  },
  {
    "localitat": "la Font de la Vila, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "la Font Seca, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6684794,2.6674664",
    "lat": 39.6684794,
    "long": 2.6674664
  },
  {
    "localitat": "la Font, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8935895,3.0174515",
    "lat": 39.8935895,
    "long": 3.0174515
  },
  {
    "localitat": "la Garriga, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6347529,2.6551268",
    "lat": 39.6347529,
    "long": 2.6551268
  },
  {
    "localitat": "la Gerreria, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5711621,2.6545913",
    "lat": 39.5711621,
    "long": 2.6545913
  },
  {
    "localitat": "la Gran Via, Inca",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Indioteria, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6023106,2.6665354",
    "lat": 39.6023106,
    "long": 2.6665354
  },
  {
    "localitat": "la Llotja, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5683692,2.6443686",
    "lat": 39.5683692,
    "long": 2.6443686
  },
  {
    "localitat": "la Màniga, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6113236,3.2854006",
    "lat": 39.6113236,
    "long": 3.2854006
  },
  {
    "localitat": "la Marina, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "la Marineta, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5515594,3.3160149",
    "lat": 39.5515594,
    "long": 3.3160149
  },
  {
    "localitat": "la Mola, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4703806,3.1390744",
    "lat": 39.4703806,
    "long": 3.1390744
  },
  {
    "localitat": "la Moleta, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "la Pedrera, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5680753,2.6285226",
    "lat": 39.5680753,
    "long": 2.6285226
  },
  {
    "localitat": "la Plaça de l'Aigua, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6948162,3.3520207",
    "lat": 39.6948162,
    "long": 3.3520207
  },
  {
    "localitat": "la Plaça, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7758332,2.9631835",
    "lat": 39.7758332,
    "long": 2.9631835
  },
  {
    "localitat": "la Porrassa, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5001918,2.5171628",
    "lat": 39.5001918,
    "long": 2.5171628
  },
  {
    "localitat": "la Portellada, Costitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6564158,2.94944",
    "lat": 39.6564158,
    "long": 2.94944
  },
  {
    "localitat": "la Punta Negra, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.527463,2.5530848",
    "lat": 39.527463,
    "long": 2.5530848
  },
  {
    "localitat": "la Punta Reina, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5192774,3.3130805",
    "lat": 39.5192774,
    "long": 3.3130805
  },
  {
    "localitat": "la Punta, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Quintana, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6408142,3.0070807",
    "lat": 39.6408142,
    "long": 3.0070807
  },
  {
    "localitat": "la Ràpita, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3679034,2.9388228",
    "lat": 39.3679034,
    "long": 2.9388228
  },
  {
    "localitat": "la Raval, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6959651,2.7002508",
    "lat": 39.6959651,
    "long": 2.7002508
  },
  {
    "localitat": "la Raval, Estellencs",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6534687,2.4811265",
    "lat": 39.6534687,
    "long": 2.4811265
  },
  {
    "localitat": "la Raval, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Raval, Petra",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Rectoria Vella, Petra",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6140955,3.1139948",
    "lat": 39.6140955,
    "long": 3.1139948
  },
  {
    "localitat": "la Riba, Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=41.3179203,1.1773856",
    "lat": 41.3179203,
    "long": 1.1773856
  },
  {
    "localitat": "la Romana, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.535664,2.460962",
    "lat": 39.535664,
    "long": 2.460962
  },
  {
    "localitat": "la Rota, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "la Rutla, Petra",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Sínia, Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5966418,3.0428664",
    "lat": 39.5966418,
    "long": 3.0428664
  },
  {
    "localitat": "la Soledat, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5730151,2.6736484",
    "lat": 39.5730151,
    "long": 2.6736484
  },
  {
    "localitat": "la Sorda, Campos",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Talaia de Peguera, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5401122,2.4460222",
    "lat": 39.5401122,
    "long": 2.4460222
  },
  {
    "localitat": "la Talaia, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7383353,3.4516366",
    "lat": 39.7383353,
    "long": 3.4516366
  },
  {
    "localitat": "la Tanca de Can Buc, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6148818,2.6809664",
    "lat": 39.6148818,
    "long": 2.6809664
  },
  {
    "localitat": "la Tanca de la Creu, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "la Tanca Gran, Consell",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "la Tanca, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "la Tanqueta, Algaida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5601816,2.8918657",
    "lat": 39.5601816,
    "long": 2.8918657
  },
  {
    "localitat": "la Teulera, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "la Teulera, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5722101,2.6127252",
    "lat": 39.5722101,
    "long": 2.6127252
  },
  {
    "localitat": "la Torre d'en Pau, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5499682,2.6926143",
    "lat": 39.5499682,
    "long": 2.6926143
  },
  {
    "localitat": "la Torre de Son Durí, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3624816,2.9532928",
    "lat": 39.3624816,
    "long": 2.9532928
  },
  {
    "localitat": "la Torre Major, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8355506,3.1470278",
    "lat": 39.8355506,
    "long": 3.1470278
  },
  {
    "localitat": "la Torre Nova, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3282719,3.1502668",
    "lat": 39.3282719,
    "long": 3.1502668
  },
  {
    "localitat": "la Torre Redona, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5381631,2.7176716",
    "lat": 39.5381631,
    "long": 2.7176716
  },
  {
    "localitat": "la Torre, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "la Vila Nova, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6613768,2.5814673",
    "lat": 39.6613768,
    "long": 2.5814673
  },
  {
    "localitat": "la Vila Nova, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "la Vila Vella, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8588423,-0.1844892",
    "lat": 39.8588423,
    "long": -0.1844892
  },
  {
    "localitat": "la Vila, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6216667,2.5269444",
    "lat": 39.6216667,
    "long": 2.5269444
  },
  {
    "localitat": "la Vileta, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6657184,2.579555",
    "lat": 39.6657184,
    "long": 2.579555
  },
  {
    "localitat": "la Vinya d'en Fonoll, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "la Vinya de Son Llebre, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5905463,2.7052912",
    "lat": 39.5905463,
    "long": 2.7052912
  },
  {
    "localitat": "la Vinya de Son Verí, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6250808,2.72963",
    "lat": 39.6250808,
    "long": 2.72963
  },
  {
    "localitat": "la Vinya Vella, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=41.5485968,1.8476978",
    "lat": 41.5485968,
    "long": 1.8476978
  },
  {
    "localitat": "la Vinyassa, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5752877,2.6563297",
    "lat": 39.5752877,
    "long": 2.6563297
  },
  {
    "localitat": "la Vinyola, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=42.452138,1.907145",
    "lat": 42.452138,
    "long": 1.907145
  },
  {
    "localitat": "la Volta Piquera, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "Laiar, Sencelles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.63006439999999,2.8875086",
    "lat": 39.63006439999999,
    "long": 2.8875086
  },
  {
    "localitat": "les Alqueries, Santa Eugènia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6328896,2.8455556",
    "lat": 39.6328896,
    "long": 2.8455556
  },
  {
    "localitat": "les Argiles, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "les Barreres, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6272019,2.5283318",
    "lat": 39.6272019,
    "long": 2.5283318
  },
  {
    "localitat": "les Cadenes, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "les Cases Noves, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7194246,2.8286724",
    "lat": 39.7194246,
    "long": 2.8286724
  },
  {
    "localitat": "les Casetes dels Capellans, Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=39.77313609999999,3.142775",
    "lat": 39.77313609999999,
    "long": 3.142775
  },
  {
    "localitat": "les Cent Cases, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5742467,2.6668088",
    "lat": 39.5742467,
    "long": 2.6668088
  },
  {
    "localitat": "les Coves del Vicari, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "les Coves, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "les Covetes, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3547576,2.9718966",
    "lat": 39.3547576,
    "long": 2.9718966
  },
  {
    "localitat": "les Dames, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "les Fletxes, Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7183392,2.8689332",
    "lat": 39.7183392,
    "long": 2.8689332
  },
  {
    "localitat": "les Fontanelles, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.531452,2.7277553",
    "lat": 39.531452,
    "long": 2.7277553
  },
  {
    "localitat": "les Forques, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "les Llegítimes, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "les Marjades, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "les Monges Tancades, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "les Olleries, Santa Eugènia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6132914,2.8293539",
    "lat": 39.6132914,
    "long": 2.8293539
  },
  {
    "localitat": "les Palmeres, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "les Pedreres, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "les Penyes, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6402336,3.0074549",
    "lat": 39.6402336,
    "long": 3.0074549
  },
  {
    "localitat": "les Planes, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5652248,2.5041903",
    "lat": 39.5652248,
    "long": 2.5041903
  },
  {
    "localitat": "les Rogetes, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6656493,2.5794293",
    "lat": 39.6656493,
    "long": 2.5794293
  },
  {
    "localitat": "les Roques Llises, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5687852,3.0841871",
    "lat": 39.5687852,
    "long": 3.0841871
  },
  {
    "localitat": "les Roques, Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=42.1493043,2.9297688",
    "lat": 42.1493043,
    "long": 2.9297688
  },
  {
    "localitat": "les Rotes Velles, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5267228,2.469459800000001",
    "lat": 39.5267228,
    "long": 2.469459800000001
  },
  {
    "localitat": "les Rotes, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7073368,2.7916752",
    "lat": 39.7073368,
    "long": 2.7916752
  },
  {
    "localitat": "les Salines",
    "url": "https://www.google.com/maps/search/?api=1&query=41.3287319,1.6660487",
    "lat": 41.3287319,
    "long": 1.6660487
  },
  {
    "localitat": "les Set Cases, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "les Tanques, Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7183392,2.8689332",
    "lat": 39.7183392,
    "long": 2.8689332
  },
  {
    "localitat": "les Tapereres, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "les Trempes, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.632573,2.709164",
    "lat": 39.632573,
    "long": 2.709164
  },
  {
    "localitat": "Llenaira, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8913378,3.0765155",
    "lat": 39.8913378,
    "long": 3.0765155
  },
  {
    "localitat": "Lloret de Vistalegre",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6178747,2.9745906",
    "lat": 39.6178747,
    "long": 2.9745906
  },
  {
    "localitat": "Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7183392,2.8689332",
    "lat": 39.7183392,
    "long": 2.8689332
  },
  {
    "localitat": "Llubí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6994185,3.0063135",
    "lat": 39.6994185,
    "long": 3.0063135
  },
  {
    "localitat": "Lluc, Escorca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.82614969999999,2.8472695",
    "lat": 39.82614969999999,
    "long": 2.8472695
  },
  {
    "localitat": "Llucalcari, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7651337,2.6532086",
    "lat": 39.7651337,
    "long": 2.6532086
  },
  {
    "localitat": "Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.49084390000001,2.8916657",
    "lat": 39.49084390000001,
    "long": 2.8916657
  },
  {
    "localitat": "Los Damunt, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7075697,2.7836886",
    "lat": 39.7075697,
    "long": 2.7836886
  },
  {
    "localitat": "Los Davall, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7073368,2.7916752",
    "lat": 39.7073368,
    "long": 2.7916752
  },
  {
    "localitat": "Magaluf, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5059889,2.5307101",
    "lat": 39.5059889,
    "long": 2.5307101
  },
  {
    "localitat": "Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "Mancor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7501201,2.8723629",
    "lat": 39.7501201,
    "long": 2.8723629
  },
  {
    "localitat": "Manresa, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8532672,3.1240239",
    "lat": 39.8532672,
    "long": 3.1240239
  },
  {
    "localitat": "Mar i Estany, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8426976,3.1284742",
    "lat": 39.8426976,
    "long": 3.1284742
  },
  {
    "localitat": "Maria",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248556,2.727774",
    "lat": 39.6248556,
    "long": 2.727774
  },
  {
    "localitat": "Marratxinet, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426384,2.7517996",
    "lat": 39.6426384,
    "long": 2.7517996
  },
  {
    "localitat": "Massanella, Mancor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.750775,2.8734004",
    "lat": 39.750775,
    "long": 2.8734004
  },
  {
    "localitat": "Moleta, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "Montferrutx, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7327596,3.2740805",
    "lat": 39.7327596,
    "long": 3.2740805
  },
  {
    "localitat": "Montport, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744273,2.4202537",
    "lat": 39.5744273,
    "long": 2.4202537
  },
  {
    "localitat": "Montuïri",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5678701,2.9819309",
    "lat": 39.5678701,
    "long": 2.9819309
  },
  {
    "localitat": "Moscari, Selva",
    "url": "https://www.google.com/maps/search/?api=1&query=39.76595390000001,2.9341395",
    "lat": 39.76595390000001,
    "long": 2.9341395
  },
  {
    "localitat": "Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7655216,3.0876783",
    "lat": 39.7655216,
    "long": 3.0876783
  },
  {
    "localitat": "N'Aguait, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6968668,3.4545589",
    "lat": 39.6968668,
    "long": 3.4545589
  },
  {
    "localitat": "N'Anyana, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7023646,3.4353222",
    "lat": 39.7023646,
    "long": 3.4353222
  },
  {
    "localitat": "Na Beltrana, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6246306,2.5289836",
    "lat": 39.6246306,
    "long": 2.5289836
  },
  {
    "localitat": "Na Capitana, Petra",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Na Caragol, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6951159,3.3463674",
    "lat": 39.6951159,
    "long": 3.3463674
  },
  {
    "localitat": "Na Carretó, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6973882,3.3495101",
    "lat": 39.6973882,
    "long": 3.3495101
  },
  {
    "localitat": "Na Crema, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6967822,3.347812",
    "lat": 39.6967822,
    "long": 3.347812
  },
  {
    "localitat": "Na Mallola, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Na Pati, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6954063,3.3498236",
    "lat": 39.6954063,
    "long": 3.3498236
  },
  {
    "localitat": "Na Pelada, Petra",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6080487,3.1108755",
    "lat": 39.6080487,
    "long": 3.1108755
  },
  {
    "localitat": "Na Pirris, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "Na Taconera, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.68682949999999,3.4499391",
    "lat": 39.68682949999999,
    "long": 3.4499391
  },
  {
    "localitat": "Orient, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6967194,2.7014103",
    "lat": 39.6967194,
    "long": 2.7014103
  },
  {
    "localitat": "Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Palmanova, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5242182,2.5373264",
    "lat": 39.5242182,
    "long": 2.5373264
  },
  {
    "localitat": "Palmanyola, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6612247,2.6698155",
    "lat": 39.6612247,
    "long": 2.6698155
  },
  {
    "localitat": "Pantagona, Mancor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7507857,2.8734871",
    "lat": 39.7507857,
    "long": 2.8734871
  },
  {
    "localitat": "Pedrafort, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4267698,2.744318",
    "lat": 39.4267698,
    "long": 2.744318
  },
  {
    "localitat": "Peguera, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.53964819999999,2.4468177",
    "lat": 39.53964819999999,
    "long": 2.4468177
  },
  {
    "localitat": "Penya-roja, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6312812,3.3479838",
    "lat": 39.6312812,
    "long": 3.3479838
  },
  {
    "localitat": "Petra",
    "url": "https://www.google.com/maps/search/?api=1&query=30.3284544,35.4443622",
    "lat": 30.3284544,
    "long": 35.4443622
  },
  {
    "localitat": "Pina, Algaida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6003313,2.9232136",
    "lat": 39.6003313,
    "long": 2.9232136
  },
  {
    "localitat": "Planera, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.640139,2.7077408",
    "lat": 39.640139,
    "long": 2.7077408
  },
  {
    "localitat": "Platja d'Alcúdia, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8243176,3.11555",
    "lat": 39.8243176,
    "long": 3.11555
  },
  {
    "localitat": "Platja d'en Repic, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.790488,2.6919019",
    "lat": 39.790488,
    "long": 2.6919019
  },
  {
    "localitat": "Platja de Muro, Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7655216,3.0876783",
    "lat": 39.7655216,
    "long": 3.0876783
  },
  {
    "localitat": "Platja de Palma, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5372211,2.7170189",
    "lat": 39.5372211,
    "long": 2.7170189
  },
  {
    "localitat": "Platja dels Francesos, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.818542,3.114053",
    "lat": 39.818542,
    "long": 3.114053
  },
  {
    "localitat": "Polígon de Llevant, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5657524,2.6698155",
    "lat": 39.5657524,
    "long": 2.6698155
  },
  {
    "localitat": "Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8771939,3.0162026",
    "lat": 39.8771939,
    "long": 3.0162026
  },
  {
    "localitat": "Porreres",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5148577,3.0238803",
    "lat": 39.5148577,
    "long": 3.0238803
  },
  {
    "localitat": "Porrerí, Porreres",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5148577,3.0238803",
    "lat": 39.5148577,
    "long": 3.0238803
  },
  {
    "localitat": "Port d'Alcúdia, Alcúdia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8429965,3.1329618",
    "lat": 39.8429965,
    "long": 3.1329618
  },
  {
    "localitat": "Port d'Andratx, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5440685,2.3893846",
    "lat": 39.5440685,
    "long": 2.3893846
  },
  {
    "localitat": "Port de Pollença, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.9074062,3.0824071",
    "lat": 39.9074062,
    "long": 3.0824071
  },
  {
    "localitat": "Port de Sóller, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7928241,2.6963495",
    "lat": 39.7928241,
    "long": 2.6963495
  },
  {
    "localitat": "Port de Valldemossa, Valldemossa",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7183535,2.5874814",
    "lat": 39.7183535,
    "long": 2.5874814
  },
  {
    "localitat": "Portals Nous, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5348091,2.5712658",
    "lat": 39.5348091,
    "long": 2.5712658
  },
  {
    "localitat": "Portals Vells, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4733171,2.519329",
    "lat": 39.4733171,
    "long": 2.519329
  },
  {
    "localitat": "Portocolom, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4157816,3.2564768",
    "lat": 39.4157816,
    "long": 3.2564768
  },
  {
    "localitat": "Portocristo, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.54413479999999,3.3368181",
    "lat": 39.54413479999999,
    "long": 3.3368181
  },
  {
    "localitat": "Pòrtol Nou, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.617573,2.78094",
    "lat": 39.617573,
    "long": 2.78094
  },
  {
    "localitat": "Pòrtol, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6149978,2.7717582",
    "lat": 39.6149978,
    "long": 2.7717582
  },
  {
    "localitat": "Portopetro, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.36182590000001,3.2083589",
    "lat": 39.36182590000001,
    "long": 3.2083589
  },
  {
    "localitat": "Portopí, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.55325,2.6232692",
    "lat": 39.55325,
    "long": 2.6232692
  },
  {
    "localitat": "Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6272019,2.5283318",
    "lat": 39.6272019,
    "long": 2.5283318
  },
  {
    "localitat": "Randa, Algaida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5264417,2.915879",
    "lat": 39.5264417,
    "long": 2.915879
  },
  {
    "localitat": "Ruberts, Sencelles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.62287600000001,2.9372617",
    "lat": 39.62287600000001,
    "long": 2.9372617
  },
  {
    "localitat": "Sa Pobla",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7697384,3.0250778",
    "lat": 39.7697384,
    "long": 3.0250778
  },
  {
    "localitat": "Sant Agustí, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5532011,2.5966036",
    "lat": 39.5532011,
    "long": 2.5966036
  },
  {
    "localitat": "Sant Domingo, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7211999,2.9074735",
    "lat": 39.7211999,
    "long": 2.9074735
  },
  {
    "localitat": "Sant Elm, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.580949,2.3508103",
    "lat": 39.580949,
    "long": 2.3508103
  },
  {
    "localitat": "Sant Francesc, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7195718,2.9118442",
    "lat": 39.7195718,
    "long": 2.9118442
  },
  {
    "localitat": "Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5963621,3.0392509",
    "lat": 39.5963621,
    "long": 3.0392509
  },
  {
    "localitat": "Sant Jordi, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5559913,2.7785524",
    "lat": 39.5559913,
    "long": 2.7785524
  },
  {
    "localitat": "Sant Josep, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6248589,2.7277741",
    "lat": 39.6248589,
    "long": 2.7277741
  },
  {
    "localitat": "Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6113236,3.2854006",
    "lat": 39.6113236,
    "long": 3.2854006
  },
  {
    "localitat": "Sant Marçal, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6188488,2.7363945",
    "lat": 39.6188488,
    "long": 2.7363945
  },
  {
    "localitat": "Sant Pere, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7377666,3.2791114",
    "lat": 39.7377666,
    "long": 3.2791114
  },
  {
    "localitat": "Santa Catalina, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6946212,3.350928",
    "lat": 39.6946212,
    "long": 3.350928
  },
  {
    "localitat": "Santa Eugènia",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6230688,2.8383888",
    "lat": 39.6230688,
    "long": 2.8383888
  },
  {
    "localitat": "Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7052539,3.1060899",
    "lat": 39.7052539,
    "long": 3.1060899
  },
  {
    "localitat": "Santa Maria del Camí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6486796,2.7748885",
    "lat": 39.6486796,
    "long": 2.7748885
  },
  {
    "localitat": "Santa Maria la Major, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7214874,2.9114258",
    "lat": 39.7214874,
    "long": 2.9114258
  },
  {
    "localitat": "Santa Ponça Nou, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5029445,2.4715422",
    "lat": 39.5029445,
    "long": 2.4715422
  },
  {
    "localitat": "Santa Ponça, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5029445,2.4715422",
    "lat": 39.5029445,
    "long": 2.4715422
  },
  {
    "localitat": "Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3549119,3.1277273",
    "lat": 39.3549119,
    "long": 3.1277273
  },
  {
    "localitat": "Selva",
    "url": "https://www.google.com/maps/search/?api=1&query=46.5559672,11.7558499",
    "lat": 46.5559672,
    "long": 11.7558499
  },
  {
    "localitat": "Sencelles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6460665,2.8994973",
    "lat": 39.6460665,
    "long": 2.8994973
  },
  {
    "localitat": "Serra Nova, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=40.6913404,17.7621896",
    "lat": 40.6913404,
    "long": 17.7621896
  },
  {
    "localitat": "Serra Vella, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7052539,3.1060899",
    "lat": 39.7052539,
    "long": 3.1060899
  },
  {
    "localitat": "Síller, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.9125857,3.0617392",
    "lat": 39.9125857,
    "long": 3.0617392
  },
  {
    "localitat": "Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6426503,3.008815",
    "lat": 39.6426503,
    "long": 3.008815
  },
  {
    "localitat": "So na Monda, Inca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7249357,2.915529",
    "lat": 39.7249357,
    "long": 2.915529
  },
  {
    "localitat": "So na Pau, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Sobremunt, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=42.03570970000001,2.1654733",
    "lat": 42.03570970000001,
    "long": 2.1654733
  },
  {
    "localitat": "Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7670693,2.7157866",
    "lat": 39.7670693,
    "long": 2.7157866
  },
  {
    "localitat": "Son Alegre, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Amar, Bunyola",
    "url": "https://www.google.com/maps/search/?api=1&query=39.66106509999999,2.676142",
    "lat": 39.66106509999999,
    "long": 2.676142
  },
  {
    "localitat": "Son Ametler Vell, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6044308,2.7267658",
    "lat": 39.6044308,
    "long": 2.7267658
  },
  {
    "localitat": "Son Ametler, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6044308,2.7267658",
    "lat": 39.6044308,
    "long": 2.7267658
  },
  {
    "localitat": "Son Anglada, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6079199,2.6188656",
    "lat": 39.6079199,
    "long": 2.6188656
  },
  {
    "localitat": "Son Armadans, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5692934,2.6276116",
    "lat": 39.5692934,
    "long": 2.6276116
  },
  {
    "localitat": "Son Aversó, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6674535,2.6572258",
    "lat": 39.6674535,
    "long": 2.6572258
  },
  {
    "localitat": "Son Batle, Lloseta",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7209675,2.8741396",
    "lat": 39.7209675,
    "long": 2.8741396
  },
  {
    "localitat": "Son Bauçà, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7512,2.64211",
    "lat": 39.7512,
    "long": 2.64211
  },
  {
    "localitat": "Son Bauló, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.765027,3.1541237",
    "lat": 39.765027,
    "long": 3.1541237
  },
  {
    "localitat": "Son Beltran de Baix, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "Son Beltran de Dalt, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7479394,2.6483743",
    "lat": 39.7479394,
    "long": 2.6483743
  },
  {
    "localitat": "Son Bessó, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7029067,3.4482964",
    "lat": 39.7029067,
    "long": 3.4482964
  },
  {
    "localitat": "Son Bieló, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3635406,2.9252627",
    "lat": 39.3635406,
    "long": 2.9252627
  },
  {
    "localitat": "Son Bordoi, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7011875,3.0068838",
    "lat": 39.7011875,
    "long": 3.0068838
  },
  {
    "localitat": "Son Borguny, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.68701739999999,2.5144208",
    "lat": 39.68701739999999,
    "long": 2.5144208
  },
  {
    "localitat": "Son Borràs, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7783229,2.9764268",
    "lat": 39.7783229,
    "long": 2.9764268
  },
  {
    "localitat": "Son Bru de Baix, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6272019,2.5283318",
    "lat": 39.6272019,
    "long": 2.5283318
  },
  {
    "localitat": "Son Brunet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Bugadelles, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.527366,2.5028415",
    "lat": 39.527366,
    "long": 2.5028415
  },
  {
    "localitat": "Son Cabaspre, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6859057,2.5919978",
    "lat": 39.6859057,
    "long": 2.5919978
  },
  {
    "localitat": "Son Caliu, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5271076,2.5459683",
    "lat": 39.5271076,
    "long": 2.5459683
  },
  {
    "localitat": "Son Canals, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.57937920000001,2.6667109",
    "lat": 39.57937920000001,
    "long": 2.6667109
  },
  {
    "localitat": "Son Carrió, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5885611,3.3204779",
    "lat": 39.5885611,
    "long": 3.3204779
  },
  {
    "localitat": "Son Castelló, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6003858,2.6621357",
    "lat": 39.6003858,
    "long": 2.6621357
  },
  {
    "localitat": "Son Catlar de Dalt, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4325674,3.0187739",
    "lat": 39.4325674,
    "long": 3.0187739
  },
  {
    "localitat": "Son Caulelles Nou, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.618351,2.7578754",
    "lat": 39.618351,
    "long": 2.7578754
  },
  {
    "localitat": "Son Caulelles, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.60856709999999,2.7614307",
    "lat": 39.60856709999999,
    "long": 2.7614307
  },
  {
    "localitat": "Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6201493,3.3603044",
    "lat": 39.6201493,
    "long": 3.3603044
  },
  {
    "localitat": "Son Cili, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Cladera, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5984092,2.6811089",
    "lat": 39.5984092,
    "long": 2.6811089
  },
  {
    "localitat": "Son Coll, Banyalbufar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.69422429999999,2.5552112",
    "lat": 39.69422429999999,
    "long": 2.5552112
  },
  {
    "localitat": "Son Colom, Sant Llorenç del Cardassar",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6168614,3.29157",
    "lat": 39.6168614,
    "long": 3.29157
  },
  {
    "localitat": "Son Comes, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6610314,2.5844468",
    "lat": 39.6610314,
    "long": 2.5844468
  },
  {
    "localitat": "Son Comparet, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6046847,3.3864459",
    "lat": 39.6046847,
    "long": 3.3864459
  },
  {
    "localitat": "Son Corb, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6202777,3.3849511",
    "lat": 39.6202777,
    "long": 3.3849511
  },
  {
    "localitat": "Son Cotoner, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5846168,2.6350565",
    "lat": 39.5846168,
    "long": 2.6350565
  },
  {
    "localitat": "Son Cotoneret, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5846168,2.6350565",
    "lat": 39.5846168,
    "long": 2.6350565
  },
  {
    "localitat": "Son Dameto, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5822032,2.6276116",
    "lat": 39.5822032,
    "long": 2.6276116
  },
  {
    "localitat": "Son Daviu Nou, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6369188,2.704514",
    "lat": 39.6369188,
    "long": 2.704514
  },
  {
    "localitat": "Son Daviu, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6369188,2.704514",
    "lat": 39.6369188,
    "long": 2.704514
  },
  {
    "localitat": "Son Dureta, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5745694,2.6226489",
    "lat": 39.5745694,
    "long": 2.6226489
  },
  {
    "localitat": "Son Durí, Campos",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3885241,3.0057956",
    "lat": 39.3885241,
    "long": 3.0057956
  },
  {
    "localitat": "Son Espanyolet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5744017,2.6300931",
    "lat": 39.5744017,
    "long": 2.6300931
  },
  {
    "localitat": "Son Espases Nou, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6070781,2.6446551",
    "lat": 39.6070781,
    "long": 2.6446551
  },
  {
    "localitat": "Son Fangos, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5627086,3.2040693",
    "lat": 39.5627086,
    "long": 3.2040693
  },
  {
    "localitat": "Son Ferragut, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5852667,2.6542549",
    "lat": 39.5852667,
    "long": 2.6542549
  },
  {
    "localitat": "Son Ferrandell, Valldemossa",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7012627,2.5874602",
    "lat": 39.7012627,
    "long": 2.5874602
  },
  {
    "localitat": "Son Ferrer, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4967131,2.5007602",
    "lat": 39.4967131,
    "long": 2.5007602
  },
  {
    "localitat": "Son Ferriol, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.573786,2.7133005",
    "lat": 39.573786,
    "long": 2.7133005
  },
  {
    "localitat": "Son Fillol, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Flor, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5898359,2.6325747",
    "lat": 39.5898359,
    "long": 2.6325747
  },
  {
    "localitat": "Son Font, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.589816,2.5113565",
    "lat": 39.589816,
    "long": 2.5113565
  },
  {
    "localitat": "Son Fort, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6711098,2.5726235",
    "lat": 39.6711098,
    "long": 2.5726235
  },
  {
    "localitat": "Son Fortesa, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5832517,2.6667109",
    "lat": 39.5832517,
    "long": 2.6667109
  },
  {
    "localitat": "Son Frau, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.606838,2.698476",
    "lat": 39.606838,
    "long": 2.698476
  },
  {
    "localitat": "Son Fuster, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.59031,2.674708",
    "lat": 39.59031,
    "long": 2.674708
  },
  {
    "localitat": "Son Gallard, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5612711,2.7014546",
    "lat": 39.5612711,
    "long": 2.7014546
  },
  {
    "localitat": "Son Genovès, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Gibert, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5819322,2.6842553",
    "lat": 39.5819322,
    "long": 2.6842553
  },
  {
    "localitat": "Son Gotleu, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5786058,2.6722992",
    "lat": 39.5786058,
    "long": 2.6722992
  },
  {
    "localitat": "Son Granada de Baix, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4541967,2.748957",
    "lat": 39.4541967,
    "long": 2.748957
  },
  {
    "localitat": "Son Granada, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4808666,2.7364014",
    "lat": 39.4808666,
    "long": 2.7364014
  },
  {
    "localitat": "Son Gri, Son Cervera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6257327,3.3543598",
    "lat": 39.6257327,
    "long": 3.3543598
  },
  {
    "localitat": "Son Gual, Valldemossa",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7121685,2.6228849",
    "lat": 39.7121685,
    "long": 2.6228849
  },
  {
    "localitat": "Son Gualet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Gudi, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Jofre, Andratx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5699604,2.4230975",
    "lat": 39.5699604,
    "long": 2.4230975
  },
  {
    "localitat": "Son Llinars, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5768066,2.7045499",
    "lat": 39.5768066,
    "long": 2.7045499
  },
  {
    "localitat": "Son Llompart, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6238153,2.6657219",
    "lat": 39.6238153,
    "long": 2.6657219
  },
  {
    "localitat": "Son Llull, Binissalem",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6829983,2.8923808",
    "lat": 39.6829983,
    "long": 2.8923808
  },
  {
    "localitat": "Son Maçanet, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7736732,2.9688186",
    "lat": 39.7736732,
    "long": 2.9688186
  },
  {
    "localitat": "Son Macià, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5133638,3.216779",
    "lat": 39.5133638,
    "long": 3.216779
  },
  {
    "localitat": "Son Macip, Escorca",
    "url": "https://www.google.com/maps/search/?api=1&query=39.82614969999999,2.8472695",
    "lat": 39.82614969999999,
    "long": 2.8472695
  },
  {
    "localitat": "Son Magraner, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6207788,2.6075638",
    "lat": 39.6207788,
    "long": 2.6075638
  },
  {
    "localitat": "Son Maixella, Valldemossa",
    "url": "https://www.google.com/maps/search/?api=1&query=39.668083,2.641181",
    "lat": 39.668083,
    "long": 2.641181
  },
  {
    "localitat": "Son Marc, Pollença",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8693771,2.9550182",
    "lat": 39.8693771,
    "long": 2.9550182
  },
  {
    "localitat": "Son Martorell Nou, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.555727,2.6904534",
    "lat": 39.555727,
    "long": 2.6904534
  },
  {
    "localitat": "Son Maties, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5143568,2.5383739",
    "lat": 39.5143568,
    "long": 2.5383739
  },
  {
    "localitat": "Son Mesquida, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4826201,3.0872085",
    "lat": 39.4826201,
    "long": 3.0872085
  },
  {
    "localitat": "Son Moix Blanc, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5811869,2.6255001",
    "lat": 39.5811869,
    "long": 2.6255001
  },
  {
    "localitat": "Son Moix Negre, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5870375,2.6312541",
    "lat": 39.5870375,
    "long": 2.6312541
  },
  {
    "localitat": "Son Moja, Santanyí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3368017,3.1380315",
    "lat": 39.3368017,
    "long": 3.1380315
  },
  {
    "localitat": "Son Molines, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5658929,2.6778539",
    "lat": 39.5658929,
    "long": 2.6778539
  },
  {
    "localitat": "Son Moll, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7051173,3.4510967",
    "lat": 39.7051173,
    "long": 3.4510967
  },
  {
    "localitat": "Son Moneder, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Móra, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5910426,2.7143247",
    "lat": 39.5910426,
    "long": 2.7143247
  },
  {
    "localitat": "Son Morei, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5682877,2.6506164",
    "lat": 39.5682877,
    "long": 2.6506164
  },
  {
    "localitat": "Son Moro, Muro",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7399959,3.0549499",
    "lat": 39.7399959,
    "long": 3.0549499
  },
  {
    "localitat": "Son Mulet, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6367992,2.742151",
    "lat": 39.6367992,
    "long": 2.742151
  },
  {
    "localitat": "Son Nadal, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5748007,2.6732427",
    "lat": 39.5748007,
    "long": 2.6732427
  },
  {
    "localitat": "Son Nadalet, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5728204,2.6716758",
    "lat": 39.5728204,
    "long": 2.6716758
  },
  {
    "localitat": "Son Negre, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4344834,3.1103911",
    "lat": 39.4344834,
    "long": 3.1103911
  },
  {
    "localitat": "Son Nét, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6242271,2.5243838",
    "lat": 39.6242271,
    "long": 2.5243838
  },
  {
    "localitat": "Son Noguera, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4846531,2.8519113",
    "lat": 39.4846531,
    "long": 2.8519113
  },
  {
    "localitat": "Son Oliver, Palma",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Son Oms, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5392367,2.7381171",
    "lat": 39.5392367,
    "long": 2.7381171
  },
  {
    "localitat": "Son Orlandis d'Amunt, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5929855,2.7295521",
    "lat": 39.5929855,
    "long": 2.7295521
  },
  {
    "localitat": "Son Orlandis, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5993408,2.7426312",
    "lat": 39.5993408,
    "long": 2.7426312
  },
  {
    "localitat": "Son Pacs Vell, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6050023,2.6541543",
    "lat": 39.6050023,
    "long": 2.6541543
  },
  {
    "localitat": "Son Pacs, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6039255,2.6532833",
    "lat": 39.6039255,
    "long": 2.6532833
  },
  {
    "localitat": "Son Palanca, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6493098,3.0133234",
    "lat": 39.6493098,
    "long": 3.0133234
  },
  {
    "localitat": "Son Pastor, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.622856,3.017708",
    "lat": 39.622856,
    "long": 3.017708
  },
  {
    "localitat": "Son Pelat, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Perdiu, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5697165,3.2095318",
    "lat": 39.5697165,
    "long": 3.2095318
  },
  {
    "localitat": "Son Peretó, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5907747,2.6195475",
    "lat": 39.5907747,
    "long": 2.6195475
  },
  {
    "localitat": "Son Perxana, Petra",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Son Perxana, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "Son Pisà, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5797659,2.6356047",
    "lat": 39.5797659,
    "long": 2.6356047
  },
  {
    "localitat": "Son Pocapalla, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7026677,3.4341869",
    "lat": 39.7026677,
    "long": 3.4341869
  },
  {
    "localitat": "Son Pocos, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7758332,2.9631835",
    "lat": 39.7758332,
    "long": 2.9631835
  },
  {
    "localitat": "Son Ponç dels Ullastres, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Ponç Nou, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Ponç, Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "Son Pou, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.570251,2.8030372",
    "lat": 39.570251,
    "long": 2.8030372
  },
  {
    "localitat": "Son Proenç, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4941855,3.1865371",
    "lat": 39.4941855,
    "long": 3.1865371
  },
  {
    "localitat": "Son Prunes, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5874313,2.7147833",
    "lat": 39.5874313,
    "long": 2.7147833
  },
  {
    "localitat": "Son Puça, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.778087,2.9617658",
    "lat": 39.778087,
    "long": 2.9617658
  },
  {
    "localitat": "Son Quint de Muntanya, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5910122,2.6037925",
    "lat": 39.5910122,
    "long": 2.6037925
  },
  {
    "localitat": "Son Quintana, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5512003,2.695383",
    "lat": 39.5512003,
    "long": 2.695383
  },
  {
    "localitat": "Son Ramis, Llubí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6964208,3.0030495",
    "lat": 39.6964208,
    "long": 3.0030495
  },
  {
    "localitat": "Son Ramonell Nou, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6166382,2.7115182",
    "lat": 39.6166382,
    "long": 2.7115182
  },
  {
    "localitat": "Son Ramonell, Marratxí",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6166382,2.7115182",
    "lat": 39.6166382,
    "long": 2.7115182
  },
  {
    "localitat": "Son Rapinya, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5837452,2.6164463",
    "lat": 39.5837452,
    "long": 2.6164463
  },
  {
    "localitat": "Son Ratet, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.642185,3.0059387",
    "lat": 39.642185,
    "long": 3.0059387
  },
  {
    "localitat": "Son Real, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5789452,2.6661109",
    "lat": 39.5789452,
    "long": 2.6661109
  },
  {
    "localitat": "Son Reus, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6464033,2.6808131",
    "lat": 39.6464033,
    "long": 2.6808131
  },
  {
    "localitat": "Son Riera, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5565987,2.7167189",
    "lat": 39.5565987,
    "long": 2.7167189
  },
  {
    "localitat": "Son Rigo, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5229115,2.7436339",
    "lat": 39.5229115,
    "long": 2.7436339
  },
  {
    "localitat": "Son Roca, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6046172,2.6065239",
    "lat": 39.6046172,
    "long": 2.6065239
  },
  {
    "localitat": "Son Rutlan, Deià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.59446,2.682582",
    "lat": 39.59446,
    "long": 2.682582
  },
  {
    "localitat": "Son Sabater, Sineu",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6446195,3.0082818",
    "lat": 39.6446195,
    "long": 3.0082818
  },
  {
    "localitat": "Son Santjoan, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7013299,2.7900849",
    "lat": 39.7013299,
    "long": 2.7900849
  },
  {
    "localitat": "Son Santos, Sant Joan",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5918572,3.0383172",
    "lat": 39.5918572,
    "long": 3.0383172
  },
  {
    "localitat": "Son Sardina, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6194249,2.6550634",
    "lat": 39.6194249,
    "long": 2.6550634
  },
  {
    "localitat": "Son Seguí, Alaró",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6307593,2.807936",
    "lat": 39.6307593,
    "long": 2.807936
  },
  {
    "localitat": "Son Serra de Marina, Santa Margalida",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7378573,3.2203703",
    "lat": 39.7378573,
    "long": 3.2203703
  },
  {
    "localitat": "Son Serra del Reguer, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5953893,2.6152059",
    "lat": 39.5953893,
    "long": 2.6152059
  },
  {
    "localitat": "Son Serra, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5953893,2.6152059",
    "lat": 39.5953893,
    "long": 2.6152059
  },
  {
    "localitat": "Son Serralta, Puigpunyent",
    "url": "https://www.google.com/maps/search/?api=1&query=39.61699429999999,2.5426991",
    "lat": 39.61699429999999,
    "long": 2.5426991
  },
  {
    "localitat": "Son Simonet, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6751662,2.5874077",
    "lat": 39.6751662,
    "long": 2.5874077
  },
  {
    "localitat": "Son Talent, Manacor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5789474,3.2138627",
    "lat": 39.5789474,
    "long": 3.2138627
  },
  {
    "localitat": "Son Toni, Sa Pobla",
    "url": "https://www.google.com/maps/search/?api=1&query=39.812613,3.0219084",
    "lat": 39.812613,
    "long": 3.0219084
  },
  {
    "localitat": "Son Torrat, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6710481,2.5770693",
    "lat": 39.6710481,
    "long": 2.5770693
  },
  {
    "localitat": "Son Tries, Esporles",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6602795,2.5748529",
    "lat": 39.6602795,
    "long": 2.5748529
  },
  {
    "localitat": "Son Valls, Felanitx",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4696851,3.148297",
    "lat": 39.4696851,
    "long": 3.148297
  },
  {
    "localitat": "Son Vatlori, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Verí de Baix, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5726541,2.6568551",
    "lat": 39.5726541,
    "long": 2.6568551
  },
  {
    "localitat": "Son Verí Nou, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4920525,2.7410737",
    "lat": 39.4920525,
    "long": 2.7410737
  },
  {
    "localitat": "Son Verí Vell, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.49494929999999,2.7435853",
    "lat": 39.49494929999999,
    "long": 2.7435853
  },
  {
    "localitat": "Son Verí, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4920525,2.7410737",
    "lat": 39.4920525,
    "long": 2.7410737
  },
  {
    "localitat": "Son Vida, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5868256,2.5941239",
    "lat": 39.5868256,
    "long": 2.5941239
  },
  {
    "localitat": "Son Xigala, Palma",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5956115,2.6052838",
    "lat": 39.5956115,
    "long": 2.6052838
  },
  {
    "localitat": "Sos Monjos, Artà",
    "url": "https://www.google.com/maps/search/?api=1&query=39.6938081,3.3439291",
    "lat": 39.6938081,
    "long": 3.3439291
  },
  {
    "localitat": "Terrades, Santa Maria del Camí",
    "url": "https://www.google.com/maps/search/?api=1&query=42.3099409,2.8380772",
    "lat": 42.3099409,
    "long": 2.8380772
  },
  {
    "localitat": "Tolleric, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.4169253,2.7457613",
    "lat": 39.4169253,
    "long": 2.7457613
  },
  {
    "localitat": "Torrenova, Calvià",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5110478,2.5411962",
    "lat": 39.5110478,
    "long": 2.5411962
  },
  {
    "localitat": "Torrepicada, Sóller",
    "url": "https://www.google.com/maps/search/?api=1&query=39.8063862,2.6974909",
    "lat": 39.8063862,
    "long": 2.6974909
  },
  {
    "localitat": "Ullaró, Campanet",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7768701,2.9861598",
    "lat": 39.7768701,
    "long": 2.9861598
  },
  {
    "localitat": "Valldemossa",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7114523,2.6225698",
    "lat": 39.7114523,
    "long": 2.6225698
  },
  {
    "localitat": "Vallgornera, Llucmajor",
    "url": "https://www.google.com/maps/search/?api=1&query=39.3654646,2.8697487",
    "lat": 39.3654646,
    "long": 2.8697487
  },
  {
    "localitat": "Velella, Selva",
    "url": "",
    "lat": "",
    "long": ""
  },
  {
    "localitat": "Vila-roja, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7023646,3.4353222",
    "lat": 39.7023646,
    "long": 3.4353222
  },
  {
    "localitat": "Vilafranca de Bonany",
    "url": "https://www.google.com/maps/search/?api=1&query=39.5694734,3.088738900000001",
    "lat": 39.5694734,
    "long": 3.088738900000001
  },
  {
    "localitat": "Vilanova, Capdepera",
    "url": "https://www.google.com/maps/search/?api=1&query=39.7023646,3.4353222",
    "lat": 39.7023646,
    "long": 3.4353222
  }
]

