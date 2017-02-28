import { branch, renderComponent } from 'recompose'
import Preloader from 'components/modules/Preloader'

export default branch(
  (props) => props.data.loading,
  renderComponent(Preloader),
)
