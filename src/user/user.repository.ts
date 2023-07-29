interface User {
  name: string;
  email: string;
  id: number;
  image: string | null;
}

export class UserRepository {
  private users: User[] = [
    {
      name: 'Ugo',
      email: 'ugopeter26@gmail.com',
      id: 1,
      image: null,
    },
    {
      name: 'Peter',
      email: 'ugopeter27@gmail.com',
      id: 2,
      image: null,
    },
    {
      name: 'Louiis',
      email: 'ugopeter28@gmail.com',
      id: 3,
      image: null,
    },
    {
      name: 'Ndujekwu',
      email: 'ugopeter29@gmail.com',
      id: 4,
      image: null,
    },
    {
      name: 'Ty',
      email: 'ugopeter30@gmail.com',
      id: 5,
      image: null,
    },
    {
      name: 'Wan',
      email: 'ugopeter31@gmail.com',
      id: 6,
      image: null,
    },
  ];

  async findOne(params: { where: Partial<User> }): Promise<User> {
    const { where } = params;
    const { email } = where;
    return this.users.find((user) => (user.email = email));
  }
}
