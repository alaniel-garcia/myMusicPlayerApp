import  ReactDOM  from 'react-dom/client';
import App from '@components/App.jsx'
import './assets/styles/index.scss'
import { VolumeProvider } from './context/VolumeContext';
import { SectionProvider } from './context/SectionContext';
import { SelectionProvider } from './context/SelectionContext';
import { DeviceProvider } from './context/DeviceContext';
import { OptionsProvider } from './context/OptionsContext';
import { IDBProvider } from './context/IDBContext';

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

root.render(
    <DeviceProvider>
        <VolumeProvider>
            <SectionProvider>
                <IDBProvider>
                    <SelectionProvider>
                        <OptionsProvider>
                            <App />
                        </OptionsProvider>
                    </SelectionProvider>
                </IDBProvider>
            </SectionProvider>
        </VolumeProvider>
    </DeviceProvider>
)