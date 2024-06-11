import { merge } from 'lodash';
import Card from './Card';
import Body from './Body';
import AppBar from './AppBar';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme, darkMode) {
  return merge(Card(theme, darkMode), Body(theme, darkMode), AppBar(theme, darkMode));
}
