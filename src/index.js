import  ReactDOM  from 'react-dom/client';
import App from '@components/App.jsx'
import './assets/styles/index.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
    <App />
)