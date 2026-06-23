import fs from "fs";
import path from "path";

export function upsertEnvVar(key: string, value: string): void {
  const envPath = path.join(process.cwd(), ".env.local");
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const line = `${key}=${value}`;
  const regex = new RegExp(`^#?\\s*${key}=.*$`, "gm");
  if (regex.test(content)) {
    content = content.replace(regex, line);
  } else {
    content = content.trimEnd() + (content.endsWith("\n") || content === "" ? "" : "\n") + line + "\n";
  }
  fs.writeFileSync(envPath, content, "utf8");
}

export function readEnvVar(key: string): string | undefined {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return undefined;
  const match = fs.readFileSync(envPath, "utf8").match(new RegExp(`^${key}=(.*)$`, "m"));
  if (match?.[1]?.trim()) return match[1].trim();
  return undefined;
}

export function isValidServiceRoleKey(key: string): boolean {
  const k = key.trim();
  if (k.startsWith("sb_publishable_") || k.startsWith("sb_secret_")) return false;
  if (!k.startsWith("eyJ")) return false;
  try {
    const payload = JSON.parse(Buffer.from(k.split(".")[1], "base64url").toString());
    return payload.role === "service_role";
  } catch {
    return false;
  }
}
