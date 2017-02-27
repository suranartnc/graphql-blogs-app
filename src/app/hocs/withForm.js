import { pure, withState, withHandlers, compose } from 'recompose'

export default function (fields) {
  return compose(
    withState('input', 'setInput', fields),
    withHandlers({
      onInputChange: ({ input, setInput }) => inputField => event => {
        setInput(Object.assign({}, input, {
          [inputField]: event.target.value
        }))
      },
      onSubmit: ({ input, submitForm }) => event => {
        event.preventDefault()
        return submitForm(input)
      }
    }),
    pure
  )
}
