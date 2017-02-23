export function mapToCssModules (className, cssModule) {
  if (!cssModule) return className
  return className.split(' ').map(c => cssModule[c] || c).join(' ')
}
