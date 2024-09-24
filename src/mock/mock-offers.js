const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 'e4fa75d2-c567-4820-a622-8fbe4c0579da',
        'title': 'Upgrade to a business class',
        'price': 178
      },
      {
        'id': '5108ce37-af33-4b73-8ee0-dc1acf554108',
        'title': 'Choose the radio station',
        'price': 147
      },
      {
        'id': 'b07ac019-df57-432b-9565-c61f2dfd83e1',
        'title': 'Choose temperature',
        'price': 127
      },
      {
        'id': 'bbd53cae-42e9-4b0e-89fd-eeda09c19960',
        'title': 'Drive quickly, Im in a hurry',
        'price': 92
      },
      {
        'id': 'a2732874-d2f1-47bf-81e8-7d2c6103f257',
        'title': 'Drive slowly',
        'price': 132
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'e5432ac7-a5ee-48dc-8e55-63a852ce7635',
        'title': 'Infotainment system',
        'price': 71
      },
      {
        'id': 'c55c847e-a9bc-4fd8-b8a1-ec892a1c4e93',
        'title': 'Order meal',
        'price': 84
      },
      {
        'id': '13882f18-99be-4a91-b48f-316a402541e5',
        'title': 'Choose seats',
        'price': 118
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '9dd596b1-4b7e-45c6-b9d0-e6bcbf920648',
        'title': 'Book a taxi at the arrival point',
        'price': 120
      },
      {
        'id': 'c8250503-639c-4db1-94e3-b265c3bb0cae',
        'title': 'Order a breakfast',
        'price': 61
      },
      {
        'id': 'bff79126-a492-431b-8e55-96fc92d95522',
        'title': 'Wake up at a certain time',
        'price': 103
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '6a35ff6d-2abf-4ced-aaab-9b17d1277ab6',
        'title': 'Choose meal',
        'price': 118
      },
      {
        'id': '59a47b3b-d121-4732-a41c-ad1e385f52ae',
        'title': 'Choose seats',
        'price': 157
      },
      {
        'id': '434e87dc-900f-46b2-a6e4-9d05acd2fdb5',
        'title': 'Upgrade to comfort class',
        'price': 47
      },
      {
        'id': '5bd93df9-76c8-4574-8087-8a210f6241ac',
        'title': 'Upgrade to business class',
        'price': 147
      },
      {
        'id': '0dc304c1-e265-4474-b031-157ce0a5b1b3',
        'title': 'Add luggage',
        'price': 159
      },
      {
        'id': '2ce6c82b-8d96-4f54-957c-70a265d35d1b',
        'title': 'Business lounge',
        'price': 112
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '1cb0cae4-0972-4191-9c6a-7fde4d227bf3',
        'title': 'Choose the time of check-in',
        'price': 99
      },
      {
        'id': 'c8e87f99-08de-472e-b436-ed53d0eee287',
        'title': 'Choose the time of check-out',
        'price': 86
      },
      {
        'id': 'a25e8cbf-c5b7-4ee9-9626-321ef54cc2a2',
        'title': 'Add breakfast',
        'price': 47
      },
      {
        'id': '3f600534-be68-4624-8e6c-4c50094e0a6d',
        'title': 'Laundry',
        'price': 89
      },
      {
        'id': 'd7d4501f-ef33-4fa0-b8bb-826f3be524ac',
        'title': 'Order a meal from the restaurant',
        'price': 58
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '9cbac14d-8e60-4eef-b816-751c165bf5c1',
        'title': 'Choose meal',
        'price': 179
      },
      {
        'id': '00377a0e-bd2e-4393-8972-43487ebfc925',
        'title': 'Choose seats',
        'price': 44
      },
      {
        'id': '3b86c355-9194-4946-ac9b-2e39c363d5dd',
        'title': 'Upgrade to comfort class',
        'price': 133
      },
      {
        'id': 'a5e0b999-3176-417b-b3e5-0499c797acd7',
        'title': 'Upgrade to business class',
        'price': 168
      },
      {
        'id': 'b3f3deb1-4449-48ac-b128-b14f979fd97c',
        'title': 'Add luggage',
        'price': 104
      },
      {
        'id': 'eb57a2c9-aed0-41eb-9a1c-2a2a617a45a6',
        'title': 'Business lounge',
        'price': 58
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '6a32451b-e7d9-431d-8181-f2d02adf6bb2',
        'title': 'With automatic transmission',
        'price': 160
      },
      {
        'id': 'ba35bef4-b9a0-41f1-8b17-7446776bfe5f',
        'title': 'With air conditioning',
        'price': 99
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '51909ce8-53e8-4899-ade0-1b636ac4c628',
        'title': 'Choose live music',
        'price': 168
      },
      {
        'id': '75f532c7-48ff-4962-b8ff-dfbc9a78a982',
        'title': 'Choose VIP area',
        'price': 199
      }
    ]
  }
];

export { mockOffers };
