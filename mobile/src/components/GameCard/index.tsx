import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { THEME }  from '../../theme';
import { styles } from './styles';

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerURL: string;
}
interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        source={{uri: data.bannerURL}}
        style={styles.cover}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {data._count.ads < 1 ? 'Nenhum': data._count.ads} anúncio{data._count.ads > 1 ? 's' : null}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
