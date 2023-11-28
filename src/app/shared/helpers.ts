
export function isEmpty(value:any){
  return (value=== null || value === undefined || (typeof value === 'string' && value.trim().length === 0));
}
