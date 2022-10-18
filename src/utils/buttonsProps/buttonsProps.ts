import icon_play from '@assets/icons/play_wght400.svg';
import icon_pause from '@assets/icons/pause_wght400.svg';
import icon_queue from '@assets/icons/queue_music_wght400.svg';
import icon_minimize from '@assets/icons/minimize_wght600.svg';
import icon_more from '@assets/icons/more_wght600.svg';
import icon_repeat from '@assets/icons/repeat_wght500.svg';
import icon_repeat_one from '@assets/icons/repeat_one_wght500.svg';
import icon_repeat_order from '@assets/icons/repeat_order_wght500.svg';
import icon_shuffle from '@assets/icons/shuffle.svg';
import icon_skip_prev from '@assets/icons/skip_prev_wght400.svg';
import icon_skip_next from '@assets/icons/skip_next_wght400.svg';
import icon_volume from '@assets/icons/volume_wght400.svg';


interface ButtonProps {
    icon: string;
    alt: string;
}

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
const repeat_order: ButtonProps = {
    icon: icon_repeat_order,
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

const buttonsProps: object = {
    play,
    pause,
    queue,
    minimize,
    more,
    repeat,
    repeat_one,
    repeat_order,
    shuffle,
    skip_prev,
    skip_next,
    volume
};

export default buttonsProps;
