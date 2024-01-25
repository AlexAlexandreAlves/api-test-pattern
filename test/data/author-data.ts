export const getListExpectData =
{
    id: 1,
    idBook: 1,
    firstName: "First Name 1",
    lastName: "Last Name 1"
}

export const getByIdExpectData =
{
    id: 2,
    idBook: 1,
    firstName: "First Name 2",
    lastName: "Last Name 2"
}

export const getByIdNotFounded =
{
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
    title: 'Not Found',
    status: 404,
}

export const createAuthor = {

    id: 650,
    idBook: 1,
    firstName: "Luke",
    lastName: "Skywalker"

}

export const tryToCreateAnAuthorWithInvalidData = {

    id: 650,
    idBook: 1,
    firstName: 1,
    lastName: 1

}

export const createInvalidAuthorReturnBody  = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
    title: 'One or more validation errors occurred.',
    status: 400,
}