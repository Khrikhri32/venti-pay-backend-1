const request = require('supertest');
const app = require('../../app');
const { create, getAll } = require('../services/users.service');
jest.mock('../services/users.service');

const { API_KEY } = process.env;

describe('User Controller', () => {
    
    it('should create a user', async () => {
        const newUser = {
          name: "Eric",
          email: "eric@mail.cl",
          phone: "+56949586879",
          address: "Los Olivos 365"
        };

        create.mockImplementation((data, callback) => {          
            expect(data).toEqual(expect.objectContaining({
                name: expect.stringMatching(/^[\w\s]+$/),
                email: expect.stringMatching(/^[\w.-]+@[a-z]+[.][a-z]+$/),
                phone: expect.stringMatching(/^\+\d{11}$/),
                address: expect.stringMatching(/^[\w\s\d]+$/)
            }));

            callback(null, { 
                data: {
                    insertId: 3,            
                } 
            });
        });
        const response = await request(app)
          .post('/api/users/create')
          .set('key', API_KEY)
          .send(newUser);
    
        expect(response.status).toBe(200);    
        expect(create).toHaveBeenCalledWith(newUser, expect.any(Function));
  });

  it('should get all users', async () => {
    getAll.mockImplementation((callback) => {
      callback(null, 
        [
          {
            name: "Pedro",
            email: "pedor@mail.cl",
            phone: "+56949586879",
            address: "Los Olivos 365",
            usersID: 1,
          },
          {
            name: "Eric",
            email: "eric@mail.cl",
            phone: "+56949586878",
            address: "Los Olivos 366",
            usersID: 2,
          },
          {
            name: "Christian",
            email: "christian@mail.cl",
            phone: "+56949586877",
            address: "Los Olivos 367",
            usersID: 3,
          },
        ]
      );
    });
  
    const response = await request(app)
      .get('/api/users/getAll')
      .set('key', API_KEY);
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  
  it('should not get data getAll', async () => {
    const response = await request(app)
    .get('/api/users/getAll')
  
    expect(response.status).toBe(401);
  });
  
});
