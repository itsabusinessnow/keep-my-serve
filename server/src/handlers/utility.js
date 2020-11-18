export function handleActorOptions(option) {
  if (option)
    return option
      .split(',')
      .map((val) => val === 'public') // change public/private into boolean
      .slice(0, 2); // limit to 2 options only

  return [false];
}
