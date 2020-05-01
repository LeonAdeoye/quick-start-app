import { JsonConvert, JsonObject, JsonProperty, ValueCheckingMode } from "json2typescript";
import { UtilityService } from "../services/utility.service";

@JsonObject
export class Configuration
{
  @JsonProperty("id", String)
  private _id: string;

  @JsonProperty("owner", String)
  private _owner: string;

  @JsonProperty("key", String)
  private _key: string;

  @JsonProperty("value", String)
  private _value: string;

  @JsonProperty("lastUpdatedBy", String)
  private _lastUpdatedBy: string;

  @JsonProperty("lastUpdatedOn", String)
  private _lastUpdatedOn: string;

  public constructor(owner?: string, key?:string, value?: string, lastUpdatedBy?: string, lastUpdatedOn?: string, id?: string)
  {
    this._owner = owner || "";
    this._key = key || "";
    this._value = value || "";
    this._lastUpdatedBy = lastUpdatedBy || "";
    this._lastUpdatedOn = lastUpdatedOn || "";
    this._id = id;
  }

  public toString(): string
  {
    return `{id: ${this.id}, owner: ${this.owner}, key: ${this.key}, value: ${this.value}, lastUpdatedBy: ${this.lastUpdatedBy}, lastUpdatedOn: ${this.lastUpdatedOn}}`
  }

  public toJSON(): any
  {
    return {
      id: this.id,
      owner: this.owner,
      key: this.key,
      value:this.value,
      lastUpdatedBy: this.lastUpdatedBy,
      lastUpdatedOn: this.lastUpdatedOn
    }
  }

  public get id(): string
  {
    return this._id;
  }

  public set id(value: string)
  {
    this._id = value;
  }

  public get owner(): string
  {
    return this._owner;
  }

  public set owner(value: string)
  {
    this._owner = value;
  }

  public get key(): string
  {
    return this._key;
  }

  public set key(value: string)
  {
    this._key = value;
  }

  public get value(): string
  {
    return this._value;
  }

  public set value(value: string)
  {
    this._value = value;
  }

  public get lastUpdatedBy(): string
  {
    return this._lastUpdatedBy;
  }

  public set lastUpdatedBy(value: string)
  {
    this._lastUpdatedBy = value;
  }

  public get lastUpdatedOn(): string
  {
    return this._lastUpdatedOn;
  }

  public set lastUpdatedOn(value: string)
  {
    this._lastUpdatedOn = value;
  }

  public static deserialize(jsonObject: any): Configuration
  {
    try
    {
      let jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeObject(jsonObject, Configuration);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing object: ${JSON.stringify(jsonObject)}`);
    }
  }

  public static deserializeArray(jsonObjectArray: any): Array<Configuration>
  {
    try
    {
      let jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeArray(jsonObjectArray, Configuration);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing array: ${JSON.stringify(jsonObjectArray)}`);
    }
  }
}
