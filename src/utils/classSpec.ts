export interface ClassSpec {
  class: string;
  spec: string;
}

export function stringToClassSpec(classSpecStr: string): ClassSpec {
  const firstSpaceIdx = classSpecStr.indexOf(" ");
  const spec = classSpecStr.substring(0, firstSpaceIdx);
  const klass = classSpecStr.substring(firstSpaceIdx + 1);
  return { class: klass, spec };
}
