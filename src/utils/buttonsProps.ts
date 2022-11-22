import icon_play from '@assets/icons/play_wght400.svg';
import icon_pause from '@assets/icons/pause_wght400.svg';
import icon_queue from '@assets/icons/queue_music_wght400.svg';
import icon_minimize from '@assets/icons/minimize_wght600.svg';
import icon_more from '@assets/icons/more_wght600.svg';
import icon_repeat from '@assets/icons/repeat_wght500.svg';
import icon_repeat_one from '@assets/icons/repeat_one_wght500.svg';
import icon_no_repeat from '@assets/icons/no_repeat_wght500.svg';
import icon_shuffle from '@assets/icons/shuffle.svg';
import icon_skip_prev from '@assets/icons/skip_prev_wght400.svg';
import icon_skip_next from '@assets/icons/skip_next_wght400.svg';
import icon_volume from '@assets/icons/volume_wght400.svg';
import icon_volume_off from '@assets/icons/volume_off_wght400.svg';
import icon_search from '@assets/icons/search_wght400.svg';
import icon_go_back from '@assets/icons/arrow_back_wght400.svg';
import icon_add from '@assets/icons/add_wght400.svg';
import icon_close_delete from '@assets/icons/close_wght500.svg';
import icon_drag_handle from '@assets/icons/drag_handle_wght500.svg'
import icon_check from '@assets/icons/check_wght400.svg'
import { ButtonProps, ButtonPropsContainer } from 'src/types';

// defining props
const play: ButtonProps = {
    icon: icon_play,
    alt: 'play track button',
};
const pause: ButtonProps = {
    icon: icon_pause,
    alt: 'pause track button',
};
const queue: ButtonProps = {
    icon: icon_queue,
    alt: 'queue button',
};
const minimize: ButtonProps = {
    icon: icon_minimize,
    alt: 'minimize button',
};
const more: ButtonProps = {
    icon: icon_more,
    alt: 'more button'
}
const repeat: ButtonProps = {
    icon: icon_repeat,
    alt: 'repeat button'
}
const repeat_one: ButtonProps = {
    icon: icon_repeat_one,
    alt: 'repeat one button'
}
const no_repeat: ButtonProps = {
    icon: icon_no_repeat,
    alt: 'repeat order button'
}
const shuffle: ButtonProps = {
    icon: icon_shuffle,
    alt: 'shuffle button'
}
const skip_prev: ButtonProps = {
    icon: icon_skip_prev,
    alt: 'skip previous button'
}
const skip_next: ButtonProps = {
    icon: icon_skip_next,
    alt: 'skip next button'
}
const volume: ButtonProps = {
    icon: icon_volume,
    alt: 'volume button'
}
const volume_off: ButtonProps = {
    icon: icon_volume_off,
    alt: 'volume off button'
}
const search: ButtonProps = {
    icon: icon_search,
    alt: 'search button'
}
const go_back: ButtonProps = {
    icon: icon_go_back,
    alt: 'go back button'
}
const add: ButtonProps = {
    icon: icon_add,
    alt: 'add button'
}
const close: ButtonProps = {
    icon: icon_close_delete,
    alt: 'close button'
}
const delete_: ButtonProps = {
    icon: icon_close_delete,
    alt: 'delete button'
}
const drag: ButtonProps = {
    icon: icon_drag_handle,
    alt: 'drag button'
}
const check: ButtonProps = {
    icon: icon_check,
    alt: 'selection button'
}

const buttonsProps: Array<ButtonPropsContainer> = [
    {name: 'play', props: play},
    {name: 'pause', props: pause},
    {name: 'queue', props: queue},
    {name: 'minimize', props: minimize},
    {name: 'more', props: more},
    {name: 'repeat', props: repeat},
    {name: 'repeat_one', props: repeat_one},
    {name: 'no_repeat', props: no_repeat},
    {name: 'shuffle', props: shuffle},
    {name: 'skip_prev', props: skip_prev},
    {name: 'skip_next', props: skip_next},
    {name: 'volume', props: volume},
    {name: 'volume_off', props: volume_off},
    {name: 'search', props: search},
    {name: 'go_back', props: go_back},
    {name: 'add', props: add},
    {name: 'close', props: close},
    {name: 'delete', props: delete_},
    {name: 'drag', props: drag},
    {name: 'check', props: check}
];

export default buttonsProps;
