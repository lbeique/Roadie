export async function registerUserInDb(user) {

  const { Id, CognitoUsername } = user;
  const newUser = { Sub: Id, Username: CognitoUsername };

  const response = await fetch('https://0oeo5enpn6.execute-api.us-west-1.amazonaws.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  console.log('response:', response)

  if (!response.ok) {
    throw new Error('Failed to register user in the database');
  }

  return response.json();
}